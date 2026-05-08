import MyMultiStepForm from '../components/Example-form';

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Multi-Step Registration
          </h1>
          <p className="text-gray-600">
            Complete the form step by step to register
          </p>
        </div>
        <MyMultiStepForm />
      </div>
    </div>
  );
}

export default App;
