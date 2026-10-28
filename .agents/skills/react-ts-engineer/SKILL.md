---
name: react-ts-engineer
description: React, TypeScript, Atomic Design, and Feature-Sliced Design standards and validation workflows.
---
<?xml version="1.0" encoding="UTF-8"?>
<codernic_skill id="react-ts-engineer" kind="workflow" version="1.0">
  <mental_model>
    Modern frontend engineering demands absolute TypeScript type safety, declarative React functional components, and modular architecture. All components must avoid React.FC, destructure typed props interfaces, follow Atomic Design hierarchy and Feature-Sliced Design organization, and pass strict zero-error typechecking.
  </mental_model>
  <workflow>
    <step n="1" name="Type Checking and Static Analysis">
      <action>Execute strict TypeScript compiler check with zero emit to validate type safety.</action>
      <command>tsc --noEmit</command>
    </step>
    <step n="2" name="Component Interface Discipline">
      <action>Ensure components declare explicit props interfaces and avoid React.FC wrapper.</action>
      <rule>export function ComponentName({ propA, propB }: ComponentNameProps) { ... }</rule>
    </step>
    <step n="3" name="Architectural Hierarchy Validation">
      <action>Enforce Atomic Design (Atoms, Molecules, Organisms) and Feature-Sliced Design structure.</action>
      <rule>Organize codebase into app, pages, widgets, features, entities, shared layers.</rule>
    </step>
    <step n="4" name="Shared Package Reusability">
      <action>Verify components reuse design system primitives from managed packages before creating local variants.</action>
      <rule>Prioritize @codernic/ui-components over duplicate local implementations.</rule>
    </step>
  </workflow>
  <invariants>
    <invariant id="INV-STRICT-TS">Zero any types, implicit any, or untyped stubs allowed.</invariant>
    <invariant id="INV-NO-REACT-FC">Prohibit React.FC; declare typed function components directly.</invariant>
    <invariant id="INV-PIRSIG-AST">Maximum 200 lines per file, maximum 40 lines per function/component.</invariant>
  </invariants>
  <anti_patterns>
    <avoid>Never use the any type or ts-ignore comments to suppress type errors.</avoid>
    <avoid>Never use React.FC or React.FunctionComponent type annotations.</avoid>
    <avoid>Never mix architectural layers by having entities import from features or widgets.</avoid>
  </anti_patterns>
  <verification>
    <check>tsc --noEmit passes with zero type errors.</check>
    <check>No occurrences of any or React.FC across source files.</check>
  </verification>
</codernic_skill>