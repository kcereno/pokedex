import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-300 flex">
      <div className="bg-slate-400 w-60">Sidebar</div>
      <div className="bg-slate-500 flex-1">main window</div>
    </div>
  );
}
