const Clients = () => {
  const clients = [
    { name: "Ryder", width: "322" },
    { name: "Coca-Cola", width: "300" },
    { name: "HP", width: "280" },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-hero">
            Trusted by Operators
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 items-center justify-items-center">
            {clients.map((client) => (
              <div
                key={client.name}
                className="w-full flex items-center justify-center opacity-60 hover:opacity-100 transition-smooth"
              >
                <div className="bg-card p-8 rounded-xl shadow-soft w-full h-32 flex items-center justify-center hover:shadow-card transition-smooth">
                  <span className="text-2xl font-bold text-primary">
                    {client.name}
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

export default Clients;
