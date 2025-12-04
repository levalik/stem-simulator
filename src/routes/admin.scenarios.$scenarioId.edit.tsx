import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Layout } from '../app/layouts/Layout';
import { CreateScenarioForm } from '../features/admin/create-scenario/ui/CreateScenarioForm';
import { useStore } from '../app/store';
import { Scenario } from '../entities/scenario';
import { Button } from '../shared/ui/DesignSystem';

const EditScenarioPage = () => {
  const navigate = useNavigate({ from: '/admin/scenarios/$scenarioId/edit' });
  const { scenarioId } = Route.useParams();
  const { scenarios, updateScenario, t } = useStore();

  const scenario = scenarios.find((s) => s.id === scenarioId) as Scenario | undefined;

  const handleSave = (updatedScenario: Scenario) => {
    updateScenario(updatedScenario);
    navigate({ to: '/admin' });
  };

  const handleCancel = () => navigate({ to: '/admin' });

  if (!scenario) {
    return (
      <Layout>
        <div className="bg-white rounded-3xl border border-surface-200 p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold mb-3">{t('no_scenarios_found')}</h1>
          <p className="text-surface-500 mb-6">{t('try_adjusting_search')}</p>
          <Button onClick={handleCancel}>{t('dashboard')}</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CreateScenarioForm initialData={scenario} onSave={handleSave} onCancel={handleCancel} />
    </Layout>
  );
};

export const Route = createFileRoute('/admin/scenarios/$scenarioId/edit')({
  component: EditScenarioPage,
});
