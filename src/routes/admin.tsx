import { createFileRoute } from '@tanstack/react-router';
import { Layout } from '../app/layouts/Layout';
import { AdminPanel } from '../widgets/AdminPanel';

const AdminPage = () => {
  return (
    <Layout>
      <AdminPanel />
    </Layout>
  );
};

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});
