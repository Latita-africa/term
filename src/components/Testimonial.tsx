import testimonialBg from "@/assets/testimonial-bg.jpg";

const Testimonial = () => {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-card">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={testimonialBg}
                alt="Karen Jones, Ryder System"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20">
              <div className="max-w-3xl">
                <blockquote className="mb-8">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary-foreground leading-relaxed mb-8">
                    "We have not seen this kind of accuracy with computer-vision
                    technology… this is a significant milestone in the race to
                    modernize the yard."
                  </p>
                </blockquote>

                <div className="border-t border-primary-foreground/20 pt-6">
                  <p className="text-xl font-semibold text-primary-foreground mb-1">
                    Karen Jones
                  </p>
                  <p className="text-base text-primary-foreground/80">
                    Head of New Product
                  </p>
                  <p className="text-base text-primary-foreground/80">
                    Ryder System, Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
