import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Layout } from '../app/layouts/Layout';
import { CreateScenarioForm } from '../features/admin/create-scenario/ui/CreateScenarioForm';
import { useStore } from '../app/store';
import { Scenario } from '../entities/scenario';

const CreateScenarioPage = () => {
  const { addScenario } = useStore();
  const navigate = useNavigate({ from: '/admin/scenarios/create' });

  const handleSave = (scenario: Scenario) => {
    addScenario(scenario);
    navigate({ to: '/admin' });
  };

  const handleCancel = () => navigate({ to: '/admin' });

  return (
    <Layout>
      <CreateScenarioForm onSave={handleSave} onCancel={handleCancel} />
    </Layout>
  );
};

export const Route = createFileRoute('/admin/scenarios/create')({
  component: CreateScenarioPage,
});
