
import { forwardRef } from "react";

const AboutSection = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section
            ref={ref}
            className="about-me-section"
        >
        </section>
    )
})

export default AboutSection;