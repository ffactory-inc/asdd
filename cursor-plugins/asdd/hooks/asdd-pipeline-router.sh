#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import json
import re
from pathlib import Path
import sys

raw = sys.stdin.read() or "{}"
try:
    data = json.loads(raw)
except Exception:
    data = {"raw": raw}

ROOT = Path.cwd()
SPECS_DIR = ROOT / ".cursor" / "specs"


def find_spec_name(payload):
    candidates = []
    def walk(x):
        if isinstance(x, dict):
            for v in x.values():
                walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
        elif isinstance(x, str):
            candidates.append(x)

    walk(payload)
    combined = "\n".join(candidates)
    m = re.search(r"\.cursor/specs/([^/\s]+)/", combined)
    if m:
        return m.group(1)

    if SPECS_DIR.exists():
        dirs = [d for d in SPECS_DIR.iterdir() if d.is_dir()]
        if dirs:
            dirs.sort(key=lambda d: d.stat().st_mtime, reverse=True)
            return dirs[0].name
    return "spec-name"


def find_agent_name(payload):
    keys = [
        "subagent_name",
        "agent_name",
        "name",
        "subagentType",
        "subagent_type",
    ]
    for k in keys:
        v = payload.get(k)
        if isinstance(v, str) and "asdd-" in v:
            return v.strip()

    sub = payload.get("subagent")
    if isinstance(sub, dict):
        for k in ("name", "type", "subagent_type"):
            v = sub.get(k)
            if isinstance(v, str) and "asdd-" in v:
                return v.strip()

    text_parts = []
    def walk(x):
        if isinstance(x, dict):
            for v in x.values():
                walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
        elif isinstance(x, str):
            text_parts.append(x)

    walk(payload)
    text = "\n".join(text_parts)
    m = re.search(r"\b(asdd-[a-z-]+-agent)\b", text)
    if m:
        return m.group(1)
    return ""


def read_file(path):
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        return ""


def status_in(path, allowed):
    text = read_file(path)
    if not text:
        return False
    for val in allowed:
        if re.search(rf"(?mi)^Status:\s*{re.escape(val)}\s*$", text):
            return True
    return False


def first_number_after(label, text):
    m = re.search(rf"(?im)^{re.escape(label)}\s*:\s*([0-9]+(?:\.[0-9]+)?)\s*$", text)
    if not m:
        return None
    try:
        return float(m.group(1))
    except Exception:
        return None


def validation_pass_and_ccs(spec_dir):
    report = spec_dir / "spec-validation-report.md"
    text = read_file(report)
    if not text:
        return False
    passed = bool(re.search(r"(?mi)^Status:\s*(PASSED|PASSED_WITH_WARNINGS)\s*$", text))
    ccs = first_number_after("Cumulative Confidence Score (CCS)", text)
    if ccs is None:
        m = re.search(r"(?i)\bCCS\b[^0-9]*([0-9]+(?:\.[0-9]+)?)", text)
        ccs = float(m.group(1)) if m else None
    return passed and (ccs is not None) and (ccs >= 0.65)


def design_ready(spec_dir):
    design = spec_dir / "design.md"
    text = read_file(design)
    if not text:
        return False
    conf = first_number_after("Design confidence score", text)
    return bool(re.search(r"(?mi)^Status:\s*READY\s*$", text)) and (conf is not None) and (conf >= 0.85)


def tasks_ready(spec_dir):
    for fname in ("task-plan.md", "tasks.md", "task-planning.md"):
        path = spec_dir / fname
        text = read_file(path)
        if not text:
            continue
        conf = (
            first_number_after("Task planning confidence score", text)
            or first_number_after("Confidence Score", text)
        )
        if re.search(r"(?mi)^Status:\s*READY\s*$", text) and (conf is not None) and (conf >= 0.85):
            return True
    return False


def security_passed(spec_dir):
    for fname in ("security-report.md", "qa-security-report.md", "security.md"):
        if status_in(spec_dir / fname, ["PASSED", "PASSED_WITH_WARNINGS"]):
            return True
    return False


def devops_ready(spec_dir):
    for fname in ("devops-report.md", "deployment-readiness.md", "devops.md"):
        if status_in(spec_dir / fname, ["READY", "READY_WITH_NOTES"]):
            return True
    return False


def route(agent_name, spec_name):
    spec_dir = SPECS_DIR / spec_name
    base = f".cursor/specs/{spec_name}"

    mapping = {
        "asdd-discovery-agent": (
            "asdd-spec-agent",
            f"Run asdd-spec-agent for `{base}/capability.md` and produce `{base}/requirements.md`.",
        ),
        "asdd-spec-agent": (
            "asdd-validation-agent",
            f"Run asdd-validation-agent to validate `{base}/requirements.md` and write `{base}/spec-validation-report.md`.",
        ),
        "asdd-domain-agent": (
            "asdd-design-agent",
            f"Run asdd-design-agent using `{base}/requirements.md`, `{base}/spec-validation-report.md`, and `docs/architecture/domain-model.md`; output `{base}/design.md`.",
        ),
        "asdd-implementation-agent": (
            "asdd-qa-agent",
            f"Run asdd-qa-agent for spec `{spec_name}` and produce QA validation artifacts under `{base}`.",
        ),
        "asdd-qa-agent": (
            "asdd-security-agent",
            f"Run asdd-security-agent for spec `{spec_name}` and write security results under `{base}`.",
        ),
        "asdd-observability-agent": (
            "asdd-knowledge-agent",
            f"Run asdd-knowledge-agent to capture outcomes and update knowledge artifacts from `{base}`.",
        ),
        "asdd-knowledge-agent": (
            "asdd-spec-agent",
            f"Learning loop: run asdd-spec-agent to refine `{base}/requirements.md` from knowledge feedback.",
        ),
    }

    if agent_name == "asdd-validation-agent":
        if validation_pass_and_ccs(spec_dir):
            return {
                "followup_message": f"Run asdd-domain-agent for `{spec_name}` and update `docs/architecture/domain-model.md` using `{base}/requirements.md` and `{base}/spec-validation-report.md`."
            }
        return {
            "followup_message": f"Validation gate failed (Status not PASSED/PASSED_WITH_WARNINGS or CCS < 0.65). Re-run asdd-spec-agent to revise `{base}/requirements.md`, then validate again."
        }

    if agent_name == "asdd-design-agent":
        if design_ready(spec_dir):
            return {
                "followup_message": f"Run asdd-task-planning-agent for `{base}/design.md` and create task plan artifacts under `{base}`."
            }
        return {
            "followup_message": f"Design gate not met (requires Status READY and Design confidence score >= 0.85 in `{base}/design.md`). Re-run asdd-design-agent."
        }

    if agent_name == "asdd-task-planning-agent":
        if tasks_ready(spec_dir):
            return {
                "followup_message": f"Run asdd-implementation-agent for `{spec_name}` using task plan artifacts in `{base}`."
            }
        return {
            "followup_message": f"Task planning gate not met (requires Status READY and confidence >= 0.85 in task plan artifact). Re-run asdd-task-planning-agent."
        }

    if agent_name == "asdd-security-agent":
        if security_passed(spec_dir):
            return {
                "followup_message": f"Run asdd-devops-agent for `{spec_name}` and produce deployment readiness artifacts in `{base}`."
            }
        return {
            "followup_message": f"Security gate not met (requires PASSED or PASSED_WITH_WARNINGS). Re-run asdd-security-agent after remediation."
        }

    if agent_name == "asdd-devops-agent":
        if devops_ready(spec_dir):
            return {
                "followup_message": f"Run asdd-observability-agent for `{spec_name}` and produce observability readiness artifacts in `{base}`."
            }
        return {
            "followup_message": f"DevOps gate not met (requires READY or READY_WITH_NOTES). Re-run asdd-devops-agent."
        }

    if agent_name in mapping:
        _, message = mapping[agent_name]
        return {"followup_message": message}

    return {}


agent = find_agent_name(data)
if not agent.startswith("asdd-") or not agent.endswith("-agent"):
    print("{}")
    raise SystemExit(0)

spec_name = find_spec_name(data)
result = route(agent, spec_name)
print(json.dumps(result))
PY
