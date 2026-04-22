// components/ConfirmStep.tsx
// Step 3 — show a summary of everything before submitting (compact height version)

import Avatar from "@/components/shared/Avatar"
import type { StudentFormData } from "../StudentForm"

interface Props {
  formData: StudentFormData
  isLoading: boolean
  onSubmit: () => void
  onBack: () => void
}

// ─────────────────────────────────────────────────────────────
//  Small reusable row: "Label .............. Value"
// ─────────────────────────────────────────────────────────────
const InfoRow = ({
  label,
  value,
  accent = false,
}: {
  label: string
  value: React.ReactNode
  accent?: boolean
}) => (
  <div className="flex items-center justify-between border-b border-gray-100 py-1 text-[11px] last:border-none">
    <span className="text-gray-400">{label}</span>
    <span
      className={accent ? "font-bold text-blue-600" : "font-bold text-gray-800"}
    >
      {value}
    </span>
  </div>
)

// ─────────────────────────────────────────────────────────────
//  Small badge: NEW / EXISTING / SKIPPED
// ─────────────────────────────────────────────────────────────
const Badge = ({ type }: { type: "new" | "existing" | "skipped" }) => {
  const styles = {
    new: "bg-blue-50  border-blue-200  text-blue-600",
    existing: "bg-green-50 border-green-200 text-green-600",
    skipped: "bg-gray-100 border-gray-200  text-gray-400",
  }
  const labels = { new: "NEW", existing: "EXISTING", skipped: "SKIPPED" }

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${styles[type]}`}
    >
      {labels[type]}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
//  Card wrapper used for both Student and Parent blocks
// ─────────────────────────────────────────────────────────────
const SummaryCard = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
    {children}
  </div>
)

// ─────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
const ConfirmStep = ({ formData, isLoading, onSubmit, onBack }: Props) => {
  const { studentInfo, parentData } = formData

  const willCreateParent = parentData.mode === "new"
  const willLinkParent = parentData.mode === "existing"
  const noParent = parentData.mode === "none"
  const totalAccounts = willCreateParent ? 2 : 1

  return (
    <div>
      <p className="mb-3 text-[11px] text-gray-400">
        Review everything below before creating the account(s).
      </p>

      {/* ── STUDENT BLOCK ─────────────────────────────────── */}
      <SummaryCard>
        {/* Header row: avatar + name + badge */}
        <div className="mb-2 flex items-center gap-2">
          {parentData.newParent?.profileImage !== null ? (
            <Avatar
              profileImage={studentInfo.profileImage}
              name={studentInfo.firstName}
              className="h-7 w-7 text-xs"
            />
          ) : (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-amber-200 text-xs font-bold">
              {(parentData.newParent?.firstName ?? "").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-extrabold text-gray-800">
              {studentInfo.lastName} {studentInfo.firstName || "—"}
            </p>
            <p className="text-[9px] text-gray-400">
              Student Account · Will be created
            </p>
          </div>
          <Badge type="new" />
        </div>

        {/* Detail rows */}
        <p className="mb-1 text-[9px] font-bold tracking-widest text-gray-400 uppercase">
          Student Details
        </p>
        <InfoRow
          label="Full Name"
          value={`${studentInfo.firstName} ${studentInfo.lastName}`}
        />
        <InfoRow label="Student Number" value={studentInfo.studentNumber} />
        <InfoRow label="Email" value={studentInfo.email} />
        <InfoRow label="Class ID" value={studentInfo.classId} />
        <InfoRow label="Academic Year" value={studentInfo.academicYear} />
        <InfoRow
          label="Role"
          value={<span className="text-green-600">student</span>}
        />
      </SummaryCard>

      {/* ── PARENT BLOCK: NEW ─────────────────────────────── */}
      {willCreateParent && parentData.newParent && (
        <SummaryCard>
          <div className="mb-2 flex items-center gap-2">
            {parentData.newParent?.profileImage !== null ? (
              <Avatar
                name={parentData.newParent?.firstName ?? ""}
                profileImage={parentData.newParent?.profileImage ?? null}
                className="h-7 w-7 text-xs"
              />
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-amber-200 text-xs font-bold">
                {(parentData.newParent?.firstName ?? "")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-extrabold text-gray-800">
                {parentData.newParent.lastName} {parentData.newParent.firstName}
              </p>
              <p className="text-[9px] text-gray-400">
                Parent Account · Will be created
              </p>
            </div>
            <Badge type="new" />
          </div>

          <p className="mb-1 text-[9px] font-bold tracking-widest text-gray-400 uppercase">
            Parent Details
          </p>
          <InfoRow
            label="Full Name"
            value={`${parentData.newParent.firstName} ${parentData.newParent.lastName}`}
          />
          <InfoRow label="Email" value={parentData.newParent.email} />
          <InfoRow label="Phone" value={parentData.newParent.phone || "—"} />
          <InfoRow
            label="Relationship"
            value={parentData.newParent.relationship}
          />
          <InfoRow
            label="Role"
            value={<span className="text-indigo-600">parent</span>}
          />
          <InfoRow
            label="Linked To"
            value={`${studentInfo.firstName} ${studentInfo.lastName}`}
            accent
          />
        </SummaryCard>
      )}

      {/* ── PARENT BLOCK: EXISTING ────────────────────────── */}
      {willLinkParent && parentData.existingParent && (
        <SummaryCard>
          <div className="mb-2 flex items-center gap-2">
            {parentData.newParent?.profileImage !== undefined ? (
              <Avatar
                name={parentData.existingParent.name}
                profileImage={parentData.existingParent.profileImage}
                className="h-7 w-7 text-xs"
              />
            ) : (
              <div className="h-7 w-7 shrink-0 rounded-full border bg-amber-200" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-extrabold text-gray-800">
                {parentData.existingParent.name}
              </p>
              <p className="text-[9px] text-gray-400">
                Existing parent · Will be linked
              </p>
            </div>
            <Badge type="existing" />
          </div>

          <p className="mb-1 text-[9px] font-bold tracking-widest text-gray-400 uppercase">
            Parent Details
          </p>
          <InfoRow label="Full Name" value={parentData.existingParent.name} />
          <InfoRow label="Email" value={parentData.existingParent.email} />
          <InfoRow
            label="Already Parent Of"
            value={parentData.existingParent.linkedChildren || "—"}
          />
          <InfoRow
            label="Will Also Parent"
            value={`${studentInfo.firstName} ${studentInfo.lastName}`}
            accent
          />
        </SummaryCard>
      )}

      {/* ── PARENT BLOCK: NONE ───────────────────────────── */}
      {noParent && (
        <SummaryCard>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-500">
              ?
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-gray-400">
                No Parent / Guardian
              </p>
              <p className="text-[9px] text-gray-400">
                No parent account will be created or linked
              </p>
            </div>
            <Badge type="skipped" />
          </div>
          <p className="mt-2 border-t border-gray-200 pt-2 text-[9px] text-gray-400">
            ℹ️ You can add a parent later from{" "}
            <strong className="text-gray-600">Students → Edit Student</strong>
          </p>
        </SummaryCard>
      )}

      {/* ── SUMMARY BANNER ───────────────────────────────── */}
      <div className="mb-3 flex flex-wrap gap-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-[10px] text-green-700">
        <span>
          ✅ {totalAccounts} account{totalAccounts > 1 ? "s" : ""} will be
          created
        </span>
        <span>
          ✅{" "}
          {willCreateParent
            ? "New parent will be created"
            : willLinkParent
              ? "Existing parent will be linked"
              : "No parent linked"}
        </span>
      </div>

      {/* ── FOOTER BUTTONS ───────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-[11px] font-bold text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-1.5 text-[11px] font-bold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating...
            </>
          ) : (
            `✓ Create ${totalAccounts > 1 ? "Student & Parent" : "Student"}`
          )}
        </button>
      </div>
    </div>
  )
}

export default ConfirmStep
