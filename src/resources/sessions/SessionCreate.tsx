import { Create, SimpleForm } from "react-admin";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

import { SessionForm } from "../../components/sessions/SessionForm";
import {
  COLORS,
  pageStyle,
  formSx,
} from "../../styles/SessionStyle";

export const SessionCreate = () => {
  return (
    <div style={pageStyle}>
      <Create
        component="div"
        actions={false}
        sx={{
          "& .RaCreate-main": {
            marginTop: 0,
          },
        }}
      >
        <SimpleForm sx={formSx}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              paddingBottom: "20px",
              marginBottom: "24px",
              borderBottom: `1px solid ${COLORS.darkBorder}`,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Sparkles
                  size={24}
                  color={COLORS.primary}
                />

                <h1
                  style={{
                    margin: 0,
                    fontSize: "26px",
                    color: COLORS.text.primary,
                  }}
                >
                  Nouvelle session
                </h1>
              </div>

              <p
                style={{
                  margin: "4px 0 0 34px",
                  color: COLORS.text.secondary,
                }}
              >
                Remplissez les informations de la session
              </p>
            </div>

            <Link
              to="/sessions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                color: COLORS.text.secondary,
                padding: "8px 18px",
                border: `1px solid ${COLORS.darkBorder}`,
                borderRadius: "10px",
              }}
            >
              <ArrowLeft size={16} />
              Retour aux sessions
            </Link>
          </div>

          <SessionForm />
        </SimpleForm>
      </Create>
    </div>
  );
};