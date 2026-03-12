// ─────────────────────────────────────────────────────────────
//  components/ConfirmStep.tsx
//  Step 3 — review everything before final submit
//  Shows different parent block depending on parent mode
// ─────────────────────────────────────────────────────────────

import type { StudentFormData } from "../StudentForm"

interface Props {
  formData: StudentFormData
  isLoading: boolean
  onSubmit: () => void
  onBack: () => void
}

// ── Reusable confirm row ──────────────────────────────────────
const Row = ({
  label,
  value,
  highlight,
}: {
  label: string
  value: React.ReactNode
  highlight?: boolean
}) => (
  <div className="flex items-center justify-between border-b border-gray-100 py-1.5 text-xs last:border-none">
    <span className="font-medium text-gray-400">{label}</span>
    <span
      className={`font-bold ${highlight ? "text-blue-600" : "text-gray-800"}`}
    >
      {value}
    </span>
  </div>
)

const ConfirmStep = ({ formData, isLoading, onSubmit, onBack }: Props) => {
  const { studentInfo, parentData } = formData

  // ── What gets created ─────────────────────
  const accountsCreated = parentData.mode === "new" ? 2 : 1
  const parentLabel =
    parentData.mode === "new"
      ? "New parent account will be created"
      : parentData.mode === "existing"
        ? "Existing parent will be linked"
        : "No parent linked"

  return (
    <div>
      <p className="mb-4 text-xs text-gray-400">
        Review everything below before creating the account(s).
      </p>

      {/* ── Student block ── */}
      <div className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
        {/* Block header */}
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {studentInfo.name.charAt(0) || "S"}
          </div>
          <div className="flex-1">
            <div className="text-sm font-extrabold text-gray-800">
              {studentInfo.name || "—"}
            </div>
            <div className="text-[10px] text-gray-400">
              Student Account · Will be created
            </div>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
            NEW
          </span>
        </div>

        <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Student Details
        </div>
        <Row label="Full Name" value={studentInfo.name} />
        <Row label="Student Number" value={studentInfo.studentNumber} />
        <Row label="Email" value={studentInfo.email} />
        <Row label="Class" value={`Class ID ${studentInfo.classId}`} />
        <Row label="Academic Year" value={studentInfo.academicYear} />
        <Row
          label="Role"
          value={<span className="text-green-600">student</span>}
        />
      </div>

      {/* ── Parent block — NEW ── */}
      {parentData.mode === "new" && parentData.newParent && (
        <div className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
              {parentData.newParent.name.charAt(0) || "P"}
            </div>
            <div className="flex-1">
              <div className="text-sm font-extrabold text-gray-800">
                {parentData.newParent.name}
              </div>
              <div className="text-[10px] text-gray-400">
                Parent Account · Will be created
              </div>
            </div>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
              NEW
            </span>
          </div>

          <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Parent Details
          </div>
          <Row label="Full Name" value={parentData.newParent.name} />
          <Row label="Email" value={parentData.newParent.email} />
          <Row label="Phone" value={parentData.newParent.phone || "—"} />
          <Row label="Relationship" value={parentData.newParent.relationship} />
          <Row
            label="Role"
            value={<span className="text-indigo-600">parent</span>}
          />
          <Row label="Linked To" value={studentInfo.name} highlight />
        </div>
      )}

      {/* ── Parent block — EXISTING ── */}
      {parentData.mode === "existing" && parentData.existingParent && (
        <div className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
              {parentData.existingParent.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="text-sm font-extrabold text-gray-800">
                {parentData.existingParent.name}
              </div>
              <div className="text-[10px] text-gray-400">
                Existing parent · Will be linked
              </div>
            </div>
            <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">
              EXISTING
            </span>
          </div>

          <div className="mb-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Parent Details
          </div>
          <Row label="Full Name" value={parentData.existingParent.name} />
          <Row label="Email" value={parentData.existingParent.email} />
          <Row
            label="Already Parent Of"
            value={parentData.existingParent.linkedChildren.join(", ") || "—"}
          />
          <Row label="Will Also Parent" value={studentInfo.name} highlight />
        </div>
      )}

      {/* ── Parent block — NONE ── */}
      {parentData.mode === "none" && (
        <div className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-500">
              ?
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-400">
                No Parent / Guardian
              </div>
              <div className="text-[10px] text-gray-400">
                No parent account will be created or linked
              </div>
            </div>
            <span className="rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-400">
              SKIPPED
            </span>
          </div>
          <p className="mt-3 border-t border-gray-200 pt-3 text-[10px] text-gray-400">
            ℹ️ You can add a parent later from{" "}
            <strong className="text-gray-600">Students → Edit Student</strong>
          </p>
        </div>
      )}

      {/* ── Summary banner ── */}
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 rounded-xl border border-green-200 bg-green-50 p-3 text-[11px] text-green-700">
        <span>
          ✅ {accountsCreated} account{accountsCreated > 1 ? "s" : ""} will be
          created
        </span>
        <span>✅ {parentLabel}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="rounded-lg bg-gray-100 px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating...
            </>
          ) : (
            `✓ Create ${accountsCreated > 1 ? "Student & Parent" : "Student"}`
          )}
        </button>
      </div>
    </div>
  )
}

export default ConfirmStep
