import { runAudit } from "./pre-dev-audit"

// Run the audit
runAudit().catch((error) => {
  console.error("Error running audit:", error)
  process.exit(1)
})
