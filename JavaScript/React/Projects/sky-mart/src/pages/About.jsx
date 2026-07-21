import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router";

const stats = [
  { icon: Package, number: "20K+", label: "Products" },
  { icon: Users, number: "50K+", label: "Happy Customers" },
  { icon: Star, number: "4.9", label: "Avg. Rating" },
  { icon: Truck, number: "99%", label: "On-time Delivery" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Every product is verified for quality and authenticity before listing.",
  },
  {
    icon: Truck,
    title: "Speed",
    desc: "We obsess over delivery times so your orders arrive when promised.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    desc: "Built around real customer feedback, not just business metrics.",
  },
  {
    icon: Star,
    title: "Quality",
    desc: "We curate the best — no filler, no junk, just great products.",
  },
];

const team = [
  {
    name: "Amit Swain",
    role: "Founder & CEO",
    color: "bg-volt",
    letter: "A",
    text: "text-ink",
  },
  {
    name: "Harshada Goud",
    role: "Head of Product",
    color: "bg-blue-500",
    letter: "H",
    text: "text-white",
  },
  {
    name: "Amit Swain",
    role: "Lead Engineer",
    color: "bg-purple-500",
    letter: "A",
    text: "text-white",
  },
  {
    name: "Asmita Swain",
    role: "Head of Design",
    color: "bg-rose-500",
    letter: "S",
    text: "text-white",
  },
];

const AboutPage = () => {
  return (
    <div className="animate-fade-in mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16 text-center mt-6">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-volt/10 border border-volt/20 shadow-[0_0_30px_rgba(200,244,0,0.15)]">
          <Zap className="h-10 w-10 fill-volt text-volt" />
        </div>
        <h1 className="mb-5 font-heading text-4xl font-bold text-white sm:text-5xl">
          About <span className="text-volt">SkyMart</span>
        </h1>
        <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-white/50">
          SkyMart is a next-generation e-commerce platform built to make online
          shopping fast, fair, and enjoyable—for everyone.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-[#111] p-6 text-center transition-colors hover:border-white/20"
          >
            <stat.icon className="mx-auto mb-3 h-6 w-6 text-volt" />
            <p className="font-heading text-3xl font-bold text-white">
              {stat.number}
            </p>
            <p className="mt-1 font-body text-sm font-medium text-white/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-16 rounded-3xl border border-white/10 bg-[#111] p-8 sm:p-12 shadow-xl">
        <h2 className="mb-6 font-heading text-3xl font-bold text-white">
          Our Story
        </h2>
        <div className="space-y-5 font-body text-base leading-relaxed text-white/60">
          <p>
            SkyMart started in 2026 as a small side project—two engineers tired
            of bloated, slow e-commerce experiences. We asked ourselves: what if
            shopping online was actually{" "}
            <strong className="text-white">enjoyable</strong>?
          </p>
          <p>
            Today, SkyMart serves over 50,000 customers across the country. We
            stock electronics, fashion, furniture, and everyday essentials—all
            at prices that don't require a second mortgage.
          </p>
          <p>
            We're still the same team at heart: obsessed with speed,
            transparency, and making you feel good about every purchase you make
            here.
          </p>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex gap-5 rounded-3xl border border-white/10 bg-[#111] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-volt/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-volt/10 border border-volt/20">
                <value.icon className="h-5 w-5 text-volt" />
              </div>
              <div>
                <h3 className="mb-1.5 font-heading text-lg font-bold text-white">
                  {value.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/50">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">
          Meet the Team
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {team.map((member, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-[#111] p-6 text-center transition-colors hover:border-white/20"
            >
              <div
                className={`${member.color} ${member.text} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] font-heading text-2xl font-bold shadow-lg`}
              >
                {member.letter}
              </div>
              <p className=" text-sm font-body text-base font-bold text-white">
                {member.name}
              </p>
              <p className="mt-1 text-xs font-medium text-white/40">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="relative overflow-hidden rounded-3xl border border-volt/20 bg-volt/5 p-10 text-center backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-volt/10 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <h2 className="mb-3 font-heading text-3xl font-bold text-white">
            Ready to shop?
          </h2>
          <p className="mb-8 font-body text-base text-white/60">
            Explore thousands of products at unbeatable prices.
          </p>
          <NavLink
            to="/products"
            className="inline-flex items-center gap-2 rounded-2xl bg-volt px-8 py-4 font-heading text-lg font-bold text-ink transition-transform hover:bg-volt-light active:scale-95"
          >
            Browse Products <ArrowRight className="h-5 w-5" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
