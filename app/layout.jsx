import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "VyavasthaKendra — Wholesale & Distribution Management",
  description:
    "Premium Wholesale & Distribution ERP system for FMCG distributors. Manage stock, sales orders, purchases, warehouse transfers, payments, and real-time business analytics.",
  openGraph: {
    title: "VyavasthaKendra — Wholesale & Distribution Management",
    description:
      "Premium Wholesale & Distribution ERP system for FMCG distributors.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VyavasthaKendra — Wholesale & Distribution Management",
    description:
      "Premium Wholesale & Distribution ERP system for FMCG distributors.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vyavasthakendra_erp_v1_theme')||localStorage.getItem('stockora_erp_v1_theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="bg-[#F6F7FB] dark:bg-slate-950 text-[#171A21] dark:text-slate-100 antialiased selection:bg-[#3157D5] selection:text-white"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
