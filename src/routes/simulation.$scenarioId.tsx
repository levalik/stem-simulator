import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useStore } from '../app/store';
import { Layout } from '../app/layouts/Layout';
import { TeacherFlow } from '../widgets/TeacherFlow';

type SimulationSearch = {
  step: number;
};

const SimulationPage = () => {
  const { scenarioId } = Route.useParams();
  const { step } = Route.useSearch();
  const { scenarios, startSimulation, activeScenario } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Find and start simulation if not already active
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario && (!activeScenario || activeScenario.id !== scenarioId)) {
      startSimulation(scenarioId);
    } else if (!scenario) {
      // Scenario not found, redirect to dashboard
      navigate({ to: '/dashboard' });
    }
  }, [scenarioId, scenarios, startSimulation, activeScenario, navigate]);

  if (!activeScenario) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <TeacherFlow currentStep={step} />
    </Layout>
  );
};

export const Route = createFileRoute('/simulation/$scenarioId')({
  validateSearch: (search: Record<string, unknown>): SimulationSearch => {
    const step = Number(search?.step);
    return {
      step: !isNaN(step) && step >= 0 && step <= 6 ? step : 0,
    };
  },
  component: SimulationPage,
});
