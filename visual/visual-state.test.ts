import fs from "node:fs";
import path from "node:path";

type VisualState = {
  source: Record<string, string>;
  receipt: Record<string, unknown>;
  transitions: Array<{ name: string; state: string; authority: string }>;
  stop: Record<string, unknown>;
  ledger: Array<Record<string, string>>;
};

const fixturePath = path.join(__dirname, "visual-state.json");
const state = JSON.parse(fs.readFileSync(fixturePath, "utf8")) as VisualState;

describe("Boundary State Inspector fixture", () => {
  test("declares source custody metadata", () => {
    expect(state.source.artifactId).toBeTruthy();
    expect(state.source.schemaVersion).toBeTruthy();
    expect(state.source.stateVersion).toBeTruthy();
    expect(state.source.observedAt).toBeTruthy();
  });

  test("preserves the receipt boundary", () => {
    expect(state.receipt.evidenceState).toBeTruthy();
    expect(state.receipt.consequenceOwner).toBeTruthy();
    expect(state.receipt.decisionOwner).toBeTruthy();
    expect(state.receipt.whoCanStillSayNo).toEqual(
      expect.arrayContaining([expect.any(String)])
    );
    expect(state.receipt.approvalState).not.toBe("APPROVED");
    expect(state.receipt.permissionState).not.toBe("GRANTED");
    expect(state.receipt.executionState).not.toBe("EXECUTED");
  });

  test("keeps authority transitions explicit", () => {
    const names = state.transitions.map((transition) => transition.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "Signal",
        "Proposal",
        "Validation",
        "Routing",
        "Human Review",
        "Approval",
        "Permission",
        "Release",
        "Execution",
        "Consequence",
      ])
    );
    expect(state.transitions.find((x) => x.name === "Routing")?.state).toBe(
      "GREEN_ELIGIBLE"
    );
    expect(state.transitions.find((x) => x.name === "Approval")?.state).not.toBe(
      "APPROVED"
    );
  });

  test("does not represent a live stop authority", () => {
    expect(state.stop.tested).toBe(false);
    expect(state.stop.externallyControlled).toBe("UNKNOWN");
    expect(state.stop.recoveryReauthorized).toBe("NOT_TESTED");
  });

  test("contains an inspectable ledger", () => {
    expect(state.ledger.length).toBeGreaterThan(0);
    for (const event of state.ledger) {
      expect(event.at).toBeTruthy();
      expect(event.actor).toBeTruthy();
      expect(event.event).toBeTruthy();
      expect(event.authorityBasis).toBeTruthy();
      expect(event.state).toBeTruthy();
    }
  });
});
