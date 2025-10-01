const Benefits = () => {
  const benefits = [
    {
      number: "01",
      title: "A single solution for maximum, automated throughput",
      description:
        "Deep integrations anticipate incoming loads, enabling our AI computer vision technology to automate gate check-ins and all critical yard operations: from assigning locations and maintaining real-time visibility to coordinating spotters for efficient load movement. It then closes the loop by validating assets before exit, providing comprehensive performance supervision across your entire yard network.",
    },
    {
      number: "02",
      title: "Easy, scalable operation",
      description:
        "Terminal was designed from the ground up for disruption-free operations. Easy to deploy and support, the system has a low IT lift with no 3rd party devices to support, and a modern UI/UX that's super-easy for operators to use from day one. Configurable to your yard, Terminal YOS integrates seamlessly with most TMS and WMS systems.",
    },
    {
      number: "03",
      title: "Rapid, repeatable ROI",
      description:
        "We know that yard operations run on lean budgets, which is why we price our all-inclusive solution as a service with terms that won't bust the bank. Ready to deploy right away, and rapid to scale over time.",
    },
  ];

  return (
    <section id="system" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-24">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.number}
              className="group hover:transform hover:scale-[1.02] transition-smooth"
            >
              <div className="bg-card p-8 sm:p-12 rounded-2xl shadow-card hover:shadow-xl transition-smooth border border-border">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Benefit Number */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent text-2xl font-bold">
                      {benefit.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                      Benefit {benefit.number}
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-hero mb-6 leading-tight">
                      {benefit.title.split("**").map((part, i) =>
                        i % 2 === 1 ? (
                          <span key={i} className="text-accent">
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                    </h3>
                    <p className="text-base sm:text-lg text-body leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
