import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { FlowTabs } from "../components/FlowTabs";
import { RecipeToast } from "../components/RecipeToast";
import { useAuth } from "../context/useAuth";
import { demoRecipe } from "../data/recipes";
import { calculateRecipeCost } from "../lib/calculations";
import { readMargin, writeMargin } from "../lib/storage";
import { AuthScreen } from "../screens/AuthScreen";
import { CostSimulatorScreen } from "../screens/CostSimulatorScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { IngredientsScreen } from "../screens/IngredientsScreen";
import { RecipeOverviewScreen } from "../screens/RecipeOverviewScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useEffect, useMemo, useRef, useState } from "react";

export function App() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [margin, setMarginState] = useState(() => readMargin(demoRecipe.targetMargin));
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const result = useMemo(() => calculateRecipeCost(demoRecipe, margin), [margin]);
  const showTabs = Boolean(currentUser) && location.pathname !== "/";

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function setMargin(nextMargin: number) {
    setMarginState(nextMargin);
    writeMargin(nextMargin);
  }

  function showToast(message: string) {
    setToastMessage(message);

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 4200);
  }

  return (
    <AppShell>
      {currentUser ? (
        <div className="flex h-full min-h-0 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-7">
            <Routes>
              <Route path="/" element={<Navigate to="/inicio" replace />} />
              <Route path="/inicio" element={<HomeScreen recipe={demoRecipe} result={result} />} />
              <Route path="/recetas" element={<RecipeOverviewScreen recipe={demoRecipe} result={result} />} />
              <Route
                path="/recetas/:recipeId"
                element={
                  <CostSimulatorScreen
                    recipe={demoRecipe}
                    result={result}
                    margin={margin}
                    setMargin={setMargin}
                  />
                }
              />
              <Route path="/receta" element={<Navigate to="/recetas" replace />} />
              <Route path="/insumos" element={<IngredientsScreen />} />
              <Route path="/calculo" element={<Navigate to={`/recetas/${demoRecipe.id}`} replace />} />
              <Route path="/resultado" element={<ResultScreen recipe={demoRecipe} result={result} />} />
              <Route path="/ajustes" element={<SettingsScreen />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
           {showTabs ? <FlowTabs onScanClick={() => showToast("Scan fuera del alcance")} /> : null}
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
      {toastMessage ? (
        <RecipeToast
          open
          description={toastMessage}
          onClose={() => {
            setToastMessage(null);
            if (toastTimerRef.current !== null) {
              window.clearTimeout(toastTimerRef.current);
              toastTimerRef.current = null;
            }
          }}
        />
      ) : null}
    </AppShell>
  );
}
