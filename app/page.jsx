import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import MetricsBar from '@/components/landing/MetricsBar';
import FeatureShowcase from '@/components/landing/FeatureShowcase';
import InteractiveSimulator from '@/components/landing/InteractiveSimulator';
import RoiCalculator from '@/components/landing/RoiCalculator';
import ComparisonTable from '@/components/landing/ComparisonTable';
import RolesAndSecurity from '@/components/landing/RolesAndSecurity';
import Testimonials from '@/components/landing/Testimonials';
import FaqSection from '@/components/landing/FaqSection';
import CtaBanner from '@/components/landing/CtaBanner';
import LandingFooter from '@/components/landing/LandingFooter';

export const metadata = {
  title: 'VyavasthaKendra — Wholesale & FMCG Distribution ERP Operating System',
  description:
    'The modern ERP operating system for FMCG and high-volume wholesale distributors. Multi-warehouse inventory, automated FEFO expiry rotation, route fleet dispatch, and live profit margins.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-x-hidden max-w-full">
      <LandingNav />
      <main className="flex-1 overflow-x-hidden">
        <HeroSection />
        <MetricsBar />
        <FeatureShowcase />
        <InteractiveSimulator />
        <RoiCalculator />
        <ComparisonTable />
        <RolesAndSecurity />
        <Testimonials />
        <FaqSection />
        <CtaBanner />
      </main>
      <LandingFooter />
    </div>
  );
}
