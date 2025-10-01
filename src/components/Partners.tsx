const Partners = () => {
  const partners = [
    { name: "Ryder", width: "147", height: "41" },
    { name: "Prologis", width: "181", height: "34" },
    { name: "NFI", width: "118", height: "46" },
    { name: "Lineage", width: "170", height: "44" },
    { name: "8VC", width: "114", height: "45" },
  ];

  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-hero">
            Built by the Industry
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 items-center justify-items-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="w-full flex items-center justify-center opacity-50 hover:opacity-100 transition-smooth grayscale hover:grayscale-0"
              >
                <div className="bg-card p-6 rounded-lg shadow-soft w-full h-24 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
