import json
import re
from pathlib import Path

STRUCTURED_DATA = json.dumps(
    {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Eurolit",
        "description": "Industrial flooring consulting, project management, and construction services in Athens, Greece.",
        "url": "https://www.eurolit.gr/",
        "logo": "https://www.eurolit.gr/images/logo.png",
        "image": "https://www.eurolit.gr/images/content/pic3.jpg",
        "telephone": "+30 210 807 5636",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "56 Sarantaporou Street",
            "addressLocality": "Kifissia",
            "postalCode": "145 63",
            "addressCountry": "GR",
        },
    },
    indent=2,
    ensure_ascii=False,
)

PAGE_META = {
    "index.html": {
        "title": "Eurolit | Industrial Flooring Consulting, Project Management & Construction",
        "description": "Explore Eurolit's full-service approach to industrial flooring, delivering consulting, flatness surveying, and turnkey construction for high-performance facilities.",
        "canonical": "https://www.eurolit.gr/",
    },
    "about.html": {
        "title": "About Eurolit | Industrial Flooring Experts",
        "description": "Learn about Eurolit's decades-long leadership in industrial flooring consulting, project management, and construction.",
        "canonical": "https://www.eurolit.gr/about.html",
    },
    "why_eurolit.html": {
        "title": "Why Choose Eurolit for Industrial Flooring Projects",
        "description": "Discover the values, expertise, and international partnerships that make Eurolit a trusted advisor and builder for demanding industrial floors.",
        "canonical": "https://www.eurolit.gr/why_eurolit.html",
    },
    "flatness.html": {
        "title": "Industrial Floor Flatness Expertise | Eurolit",
        "description": "Learn how Eurolit measures, specifies, and delivers floor flatness to support efficient material handling and VNA warehouse operations.",
        "canonical": "https://www.eurolit.gr/flatness.html",
    },
    "define_movement.html": {
        "title": "Defined Movement Floor Specifications | Eurolit",
        "description": "Understand defined movement floor criteria and the surveying standards Eurolit applies to guide VNA aisle performance and safety.",
        "canonical": "https://www.eurolit.gr/define_movement.html",
    },
    "free_movement.html": {
        "title": "Free Movement Floor Guidelines for Logistics Facilities | Eurolit",
        "description": "Review Eurolit's guidance on free movement floor tolerances, testing methods, and performance classes for modern warehouses.",
        "canonical": "https://www.eurolit.gr/free_movement.html",
    },
    "graphs.html": {
        "title": "Floor Flatness Graphs & Tolerance Analysis | Eurolit",
        "description": "Access Eurolit's reference graphs illustrating floor flatness classes, deviation limits, and compliance checkpoints for industrial slabs.",
        "canonical": "https://www.eurolit.gr/graphs.html",
    },
    "correction.html": {
        "title": "Industrial Floor Flatness Correction & Upgrades | Eurolit",
        "description": "See how Eurolit diagnoses and corrects flatness deviations to extend the performance of existing warehouse and logistics floors.",
        "canonical": "https://www.eurolit.gr/correction.html",
    },
    "survey.html": {
        "title": "Industrial Floor Surveying Services | Eurolit",
        "description": "Learn about Eurolit's precision surveying tools, reporting, and compliance checks for new and existing industrial floor slabs.",
        "canonical": "https://www.eurolit.gr/survey.html",
    },
    "press.html": {
        "title": "Eurolit in the Press | Featured Industrial Flooring Projects",
        "description": "Explore media coverage highlighting Eurolit's industrial flooring achievements, including award-winning VNA warehouse installations.",
        "canonical": "https://www.eurolit.gr/press.html",
    },
    "projects.html": {
        "title": "Industrial Flooring Projects Portfolio | Eurolit",
        "description": "Browse Eurolit's portfolio of logistics centers, retail facilities, and industrial floors delivered across Europe and the Middle East.",
        "canonical": "https://www.eurolit.gr/projects.html",
    },
    "project_managment.html": {
        "title": "Industrial Flooring Project Management | Eurolit",
        "description": "Eurolit provides planning, supervision, and risk management to keep industrial flooring projects on schedule and within specification.",
        "canonical": "https://www.eurolit.gr/project_managment.html",
    },
    "partners.html": {
        "title": "Eurolit Partners & Global Flooring Collaborations",
        "description": "Meet Eurolit's strategic partners who supply advanced materials and support consistent industrial flooring quality worldwide.",
        "canonical": "https://www.eurolit.gr/partners.html",
    },
    "videos.html": {
        "title": "Industrial Flooring Videos & Case Studies | Eurolit",
        "description": "Watch Eurolit's videos showcasing floor construction techniques, VNA warehouse performance, and client success stories.",
        "canonical": "https://www.eurolit.gr/videos.html",
    },
    "construction.html": {
        "title": "Industrial Flooring Construction Services | Eurolit",
        "description": "Discover Eurolit's construction capabilities, from slab-on-grade expertise to high-spec steel fiber reinforced concrete execution.",
        "canonical": "https://www.eurolit.gr/construction.html",
    },
    "CONCRETE_MIX_DESIGN.html": {
        "title": "Concrete Mix Design Consulting for Industrial Floors | Eurolit",
        "description": "Eurolit tailors concrete mix designs, admixtures, and fiber dosing to achieve durable, high-performance industrial flooring.",
        "canonical": "https://www.eurolit.gr/CONCRETE_MIX_DESIGN.html",
    },
    "CONSTRUCTION_JOINTS.html": {
        "title": "Construction Joint Design & Detailing | Eurolit",
        "description": "Learn how Eurolit engineers load-transfer, reinforcement, and placement strategies for long-lasting industrial floor joints.",
        "canonical": "https://www.eurolit.gr/CONSTRUCTION_JOINTS.html",
    },
    "CRACK_AND_DELAMINATION_AVOIDANCE.html": {
        "title": "Crack & Delamination Prevention Strategies | Eurolit",
        "description": "Explore Eurolit's best practices for reinforcement, curing, and construction sequencing to minimise industrial floor cracking and delamination.",
        "canonical": "https://www.eurolit.gr/CRACK_AND_DELAMINATION_AVOIDANCE.html",
    },
    "FLATNESS_SPECIFICATION.html": {
        "title": "Flatness Specification & Surveying Guidance | Eurolit",
        "description": "Eurolit defines floor flatness targets, measurement protocols, and tolerances to keep facilities aligned with FM and VNA standards.",
        "canonical": "https://www.eurolit.gr/FLATNESS_SPECIFICATION.html",
    },
    "FLOOR_RENOVATION.html": {
        "title": "Industrial Floor Renovation Solutions | Eurolit",
        "description": "See how Eurolit assesses damage, selects repair methods, and upgrades legacy floors to meet current operational demands.",
        "canonical": "https://www.eurolit.gr/FLOOR_RENOVATION.html",
    },
    "JOINTLESS_FLOORS.html": {
        "title": "Jointless Industrial Floor Design & Consulting | Eurolit",
        "description": "Understand Eurolit's approach to slab geometry, reinforcement, and shrinkage control for large-area jointless floors.",
        "canonical": "https://www.eurolit.gr/JOINTLESS_FLOORS.html",
    },
    "JOINT_REPAIR.html": {
        "title": "Industrial Floor Joint Repair Techniques | Eurolit",
        "description": "Learn about Eurolit's repair systems that restore joint performance and extend the life of heavily trafficked industrial floors.",
        "canonical": "https://www.eurolit.gr/JOINT_REPAIR.html",
    },
    "SFRC.html": {
        "title": "Steel Fiber Reinforced Concrete Expertise | Eurolit",
        "description": "Explore Eurolit's guidance on SFRC design, dosing, and performance benefits for industrial flooring applications.",
        "canonical": "https://www.eurolit.gr/SFRC.html",
    },
    "SURFACE_TREATMENT.html": {
        "title": "Industrial Floor Surface Treatments & Protection | Eurolit",
        "description": "Review Eurolit's recommendations for curing, sealing, and hardening treatments that protect high-performance floors.",
        "canonical": "https://www.eurolit.gr/SURFACE_TREATMENT.html",
    },
    "historic.html": {
        "title": "Industrial Flooring Consulting Heritage | Eurolit",
        "description": "Discover Eurolit's consulting philosophy and the long-term value of engineered industrial floors that support mission-critical operations.",
        "canonical": "https://www.eurolit.gr/historic.html",
    },
    "diamond_screed.html": {
        "title": "Diamond Polished Concrete Process | Eurolit",
        "description": "Learn about Eurolit's diamond polishing methods that transform concrete slabs into high-gloss, low-maintenance surfaces.",
        "canonical": "https://www.eurolit.gr/diamond_screed.html",
    },
    "diamond.html": {
        "title": "Diamond Polished Concrete Projects | Eurolit",
        "description": "View Eurolit's reference projects showcasing durable, reflective diamond-polished concrete floors.",
        "canonical": "https://www.eurolit.gr/diamond.html",
    },
    "magnesite_screed_floors.html": {
        "title": "Magnesite Screed Flooring Systems | Eurolit",
        "description": "See how Eurolit designs and installs magnesite screed floors for industrial, retail, and heritage environments.",
        "canonical": "https://www.eurolit.gr/magnesite_screed_floors.html",
    },
    "magnesite.html": {
        "title": "Magnesite Screed Project Showcase | Eurolit",
        "description": "Explore completed magnesite screed floors demonstrating Eurolit's craftsmanship and attention to architectural detail.",
        "canonical": "https://www.eurolit.gr/magnesite.html",
    },
    "eurolitegypt.html": {
        "title": "Eurolit Egypt | Industrial Flooring Partner in Cairo",
        "description": "Connect with Eurolit's exclusive Egyptian partner delivering consulting, construction, and maintenance services across the region.",
        "canonical": "https://www.eurolit.gr/eurolitegypt.html",
    },
    "eurolitkuwait.html": {
        "title": "Eurolit Kuwait | Industrial Flooring Partner",
        "description": "Meet Eurolit's certified Kuwaiti partner supporting turnkey industrial flooring solutions across the Gulf.",
        "canonical": "https://www.eurolit.gr/eurolitkuwait.html",
    },
    "eurolitoman.html": {
        "title": "Eurolit Oman | Industrial Flooring Partner",
        "description": "Learn about Eurolit's Omani partner providing consulting, supervision, and construction for regional industrial floors.",
        "canonical": "https://www.eurolit.gr/eurolitoman.html",
    },
    "contact.html": {
        "title": "Contact Eurolit | Industrial Flooring Specialists in Athens",
        "description": "Get in touch with Eurolit's Athens headquarters and global partner network for consulting, surveying, and industrial floor construction.",
        "canonical": "https://www.eurolit.gr/contact.html",
    },
    "specifications.html": {
        "title": "Industrial Floor Specifications & Standards | Eurolit",
        "description": "Access Eurolit's reference specifications, tolerance classes, and performance benchmarks for industrial floors.",
        "canonical": "https://www.eurolit.gr/specifications.html",
    },
    "vna.html": {
        "title": "VNA Warehouse Floor Efficiency | Eurolit",
        "description": "Learn how Eurolit optimises very narrow aisle warehouse floors through precision surveying, correction, and ongoing monitoring.",
        "canonical": "https://www.eurolit.gr/vna.html",
    },
}

OG_TEMPLATE = (
    "    <meta property=\"og:type\" content=\"website\" />\n"
    "    <meta property=\"og:title\" content=\"{title}\" />\n"
    "    <meta property=\"og:description\" content=\"{description}\" />\n"
    "    <meta property=\"og:url\" content=\"{canonical}\" />\n"
    "    <meta property=\"og:site_name\" content=\"Eurolit\" />\n"
    "    <meta property=\"og:image\" content=\"https://www.eurolit.gr/images/logo.png\" />\n"
    "    <meta name=\"twitter:card\" content=\"summary_large_image\" />\n"
    "    <meta name=\"twitter:title\" content=\"{title}\" />\n"
    "    <meta name=\"twitter:description\" content=\"{description}\" />\n"
    "    <link rel=\"canonical\" href=\"{canonical}\" />"
)

META_REMOVALS = [
    re.compile(r"\s*<meta[^>]*(property=\"og:[^\"]+\")[^>]*>\s*", re.IGNORECASE),
    re.compile(r"\s*<meta[^>]*(name=\"twitter:[^\"]+\")[^>]*>\s*", re.IGNORECASE),
    re.compile(r"\s*<link[^>]*rel=\"canonical\"[^>]*>\s*", re.IGNORECASE),
]


def ensure_head(text: str, meta: dict) -> str:
    text = re.sub(r"(content=\"text/html;\s*charset=)[^\"]*\"", r"\1utf-8\"", text, flags=re.IGNORECASE)
    if not re.search(r"<meta\s+charset=", text, flags=re.IGNORECASE):
        text = text.replace("<head>", "<head>\n    <meta charset=\"utf-8\" />\n", 1)
    else:
        text = re.sub(r"<meta\s+charset=\"[^\"]*\"", "<meta charset=\"utf-8\"", text, count=1, flags=re.IGNORECASE)

    if "name=\"viewport\"" not in text.lower():
        if "<meta charset=\"utf-8\" />" in text:
            text = text.replace(
                "<meta charset=\"utf-8\" />",
                "<meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n",
                1,
            )
        else:
            text = text.replace(
                "<head>",
                "<head>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n",
                1,
            )

    text = re.sub(r"<title>.*?</title>", f"<title>{meta['title']}</title>", text, count=1, flags=re.DOTALL)

    if re.search(r"<meta\s+name=\"title\"", text, flags=re.IGNORECASE):
        text = re.sub(
            r"<meta\s+name=\"title\"\s+content=\"[^\"]*\"\s*/?>",
            f"<meta name=\"title\" content=\"{meta['title']}\" />",
            text,
            count=1,
            flags=re.IGNORECASE,
        )
    else:
        text = text.replace(
            "<title>",
            f"<meta name=\"title\" content=\"{meta['title']}\" />\n    <title>",
            1,
        )

    description_tag = f"<meta name=\"description\" content=\"{meta['description']}\" />"
    if re.search(r"<meta\s+name=\"description\"", text, flags=re.IGNORECASE):
        text = re.sub(
            r"<meta\s+name=\"description\"\s+content=\"[^\"]*\"\s*/?>",
            description_tag,
            text,
            count=1,
            flags=re.IGNORECASE,
        )
    else:
        text = text.replace(
            "<meta name=\"title\" content=",
            f"{description_tag}\n    <meta name=\"title\" content=",
            1,
        )

    for pattern in META_REMOVALS:
        text = pattern.sub("\n", text)

    og_block = OG_TEMPLATE.format(**meta)
    text = text.replace(description_tag, description_tag + "\n" + og_block, 1)

    if re.search(r"<script[^>]*application/ld\+json", text, flags=re.IGNORECASE):
        text = re.sub(r"\s*<script[^>]*application/ld\+json[^>]*>.*?</script>", "", text, flags=re.IGNORECASE | re.DOTALL)
    structured_tag = "\n    <script type=\"application/ld+json\">\n" + STRUCTURED_DATA + "\n    </script>\n"
    text = text.replace("</head>", structured_tag + "</head>", 1)
    return text


def ensure_semantics(text: str) -> str:
    if '<header id="site-header">' not in text:
        if '<div id="wrapper">' in text:
            text = text.replace('<div id="wrapper">', '<div id="wrapper">\n        <header id=\"site-header\">', 1)
        elif '<div id="wrapper-top">' in text:
            text = text.replace('<div id="wrapper-top">', '<header id=\"site-header\">\n                <div id=\"wrapper-top\">', 1)
    if '<main id="main-content"' not in text:
        text = re.sub(
            r'<div id="wrapper-content"',
            '</header>\n        <main id=\"main-content\" role=\"main\">\n                <div id=\"wrapper-content\"',
            text,
            count=1,
        )

    if '<article id="content"' not in text:
        text = text.replace('<div id="content"', '<article id="content"')
    text = text.replace('</div><!-- #content -->', '</article><!-- #content -->')
    text = text.replace('<!-- #content --></div>', '<!-- #content --></article>')

    if '</main>' not in text and '<main id="main-content"' in text:
        if '</div><!-- #wrapper-content -->' in text:
            text = text.replace('</div><!-- #wrapper-content -->', '</div><!-- #wrapper-content -->\n        </main>', 1)
        elif '<!-- #wrapper-content -->' in text:
            text = text.replace('<!-- #wrapper-content -->', '</main><!-- #wrapper-content -->', 1)
        else:
            idx = text.find('</div>', text.find('<div id="wrapper-content"'))
            if idx != -1:
                text = text[: idx + 6] + '\n        </main>' + text[idx + 6 :]

    if '<nav id="mytabsmenu"' not in text:
        def replace_nav(match: re.Match) -> str:
            attrs = match.group(1)
            if 'aria-label' in attrs:
                return f'<nav id="mytabsmenu"{attrs}>'
            return f'<nav id="mytabsmenu"{attrs} aria-label="Primary navigation">'

        text = re.sub(r'<div id="mytabsmenu"([^>]*)>', replace_nav, text, count=1)
    text = re.sub(r'(</ul>\s*)</div>', r'\1</nav>', text, count=1)

    if 'footer id="wrapper-footer-text"' not in text:
        text = re.sub(r'<div([^>]*id="wrapper-footer-text"[^>]*)>', r'<footer\1>', text)
    text = text.replace('</div><!-- #wrapper-footer-text -->', '</footer><!-- #wrapper-footer-text -->')
    text = text.replace('<!-- #wrapper-footer-text --></div>', '<!-- #wrapper-footer-text --></footer>')

    return text


def update_file(path: Path, meta: dict) -> None:
    text = path.read_text(encoding='utf-8')
    text = ensure_head(text, meta)
    text = ensure_semantics(text)
    path.write_text(text, encoding='utf-8')


def main() -> None:
    for filename, meta in PAGE_META.items():
        path = Path(filename)
        if not path.exists():
            continue
        update_file(path, meta)


if __name__ == '__main__':
    main()
