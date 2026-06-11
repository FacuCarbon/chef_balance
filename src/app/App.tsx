import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { FlowTabs } from "../components/FlowTabs";
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
import { useMemo, useState } from "react";

export function App() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [margin, setMarginState] = useState(() => readMargin(demoRecipe.targetMargin));

  const result = useMemo(() => calculateRecipeCost(demoRecipe, margin), [margin]);
  const showTabs = Boolean(currentUser) && location.pathname !== "/";

  function setMargin(nextMargin: number) {
    setMarginState(nextMargin);
    writeMargin(nextMargin);
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
          {showTabs ? <FlowTabs /> : null}
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </AppShell>
  );
}
