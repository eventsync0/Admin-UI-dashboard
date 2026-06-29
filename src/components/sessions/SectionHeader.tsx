import React from "react";
import { COLORS } from "../../styles/SessionStyle";

interface SectionHeaderProps {
  icon: React.ElementType;
  label: string;
  description?: string;
}

export const SectionHeader = ({
  icon: Icon,
  label,
  description,
}: SectionHeaderProps) => {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingBottom: "16px",
          borderBottom: `1px solid ${COLORS.darkBorder}`,
        }}
      >
        <div
          style={{
            padding: "8px",
            borderRadius: "10px",
            backgroundColor: `${COLORS.primary}20`,
            color: COLORS.primary,
            display: "flex",
          }}
        >
          <Icon size={18} />
        </div>

        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: COLORS.text.primary,
            margin: 0,
          }}
        >
          {label}
        </h3>
      </div>

      {description && (
        <p
          style={{
            fontSize: "13px",
            color: COLORS.text.secondary,
            margin: "10px 0 0 42px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};