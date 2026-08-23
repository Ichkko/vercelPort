from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = "public/CV.pdf"
FONT_REGULAR = r"C:\Windows\Fonts\arial.ttf"
FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"

pdfmetrics.registerFont(TTFont("Arial", FONT_REGULAR))
pdfmetrics.registerFont(TTFont("Arial-Bold", FONT_BOLD))

styles = getSampleStyleSheet()

INK = colors.HexColor("#152033")
MUTED = colors.HexColor("#526070")
TEAL = colors.HexColor("#0f8fa8")
LINE = colors.HexColor("#d8e2ea")
SOFT = colors.HexColor("#eef8fb")


def style(name, size=9.2, leading=12.5, color=INK, bold=False, space_after=4):
    return ParagraphStyle(
        name,
        parent=styles["Normal"],
        fontName="Arial-Bold" if bold else "Arial",
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=space_after,
    )


S = {
    "name": style("Name", 23, 27, INK, True, 2),
    "role": style("Role", 10.5, 14, TEAL, True, 12),
    "section": style("Section", 10.5, 14, TEAL, True, 7),
    "body": style("Body", 8.7, 12.2, INK, False, 5),
    "small": style("Small", 8, 10.5, MUTED, False, 3),
    "item_title": style("ItemTitle", 9.3, 12.5, INK, True, 2),
    "meta": style("Meta", 8, 10.5, TEAL, True, 3),
    "chip": style("Chip", 7.8, 10, INK, False, 0),
}


def p(text, key="body"):
    return Paragraph(text, S[key])


def bullets(items):
    return ListFlowable(
        [ListItem(p(item, "body"), leftIndent=7) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=12,
        bulletFontName="Arial",
        bulletFontSize=5,
        bulletColor=TEAL,
    )


def section(title):
    return [p(title.upper(), "section")]


def chip_table(items, width):
    rows = []
    row = []
    for item in items:
        row.append(p(item, "chip"))
        if len(row) == 2:
            rows.append(row)
            row = []
    if row:
        row.append("")
        rows.append(row)

    table = Table(rows, colWidths=[width / 2 - 3, width / 2 - 3], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("BOX", (0, 0), (-1, -1), 0.35, colors.white),
                ("INNERGRID", (0, 0), (-1, -1), 2, colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def item(title, meta, body_items):
    flow = [p(title, "item_title"), p(meta, "meta")]
    if isinstance(body_items, list):
        flow.append(bullets(body_items))
    else:
        flow.append(p(body_items, "body"))
    flow.append(Spacer(1, 5))
    return flow


doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    rightMargin=17 * mm,
    leftMargin=17 * mm,
    topMargin=15 * mm,
    bottomMargin=15 * mm,
)

page_width = A4[0] - doc.leftMargin - doc.rightMargin
left_w = 58 * mm
right_w = page_width - left_w - 9 * mm

summary = (
    "Spring Boot, Java, MySQL/PostgreSQL болон Next.js, React, Tailwind ашиглан "
    "full-stack веб систем хөгжүүлдэг программ хангамжийн төгсөгч. Цэвэр UI, "
    "найдвартай API, role-based урсгал, database design болон засварлахад "
    "ойлгомжтой кодонд анхаардаг. Junior full-stack хөгжүүлэгчээр бодит "
    "бүтээгдэхүүний багт хувь нэмэр оруулахад бэлэн."
)

sidebar = [
    p("Гомбосүрэн<br/>Ичинхорлоо", "name"),
    p("Junior Full-stack Developer", "role"),
    *section("Холбоо барих"),
    p("ichkoog79@gmail.com", "small"),
    p("+976 8015 0920", "small"),
    p("Ulaanbaatar, Mongolia", "small"),
    p("github.com/Ichkko", "small"),
    p("linkedin.com/in/ichko", "small"),
    Spacer(1, 7),
    *section("Ур чадвар"),
    chip_table(
        [
            "Java",
            "Spring Boot / JPA",
            "REST API",
            "JWT Auth",
            "MySQL",
            "PostgreSQL",
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Flutter",
            "Astro",
            "Git / GitHub",
            "Docker",
            "Postman",
            "Canva",
        ],
        left_w - 16 * mm,
    ),
    Spacer(1, 8),
    *section("Хэл"),
    p("Монгол - эх хэл", "small"),
    p("Солонгос - дунд", "small"),
    p("Англи - суурь", "small"),
    Spacer(1, 8),
    *section("Шагнал"),
    p("Full Stack Hackathon 2026 - Тэргүүн байр", "small"),
    p("Дартс - Тэргүүн байр", "small"),
]

main = [
    *section("Товч танилцуулга"),
    p(summary),
    Spacer(1, 6),
    *section("Боловсрол"),
    *item(
        "Бакалавр - Программ хангамж",
        "Монгол Улсын Их Сургуулийн Баруун Бүсийн Сургууль | 2022/09 - 2026/06",
        "Программ хангамжийн инженерийн суурь, алгоритм, Java/OOP, өгөгдлийн сан, веб хөгжүүлэлт.",
    ),
    *section("Ажлын туршлага"),
    *item(
        "Үйлдвэрлэлийн дадлага - Gerelt IT LLC",
        "Ховд аймаг | 2025/06 - 2025/08",
        [
            "West.mn сургалтын платформын вебсайтыг боловсруулсан.",
            "Сургалтын мэдээлэл, бүртгэл, оролцооны урсгалыг цахим орчинд нэгтгэхэд ажилласан.",
        ],
    ),
    *item(
        "Худалдааны зөвлөх - Dariim beauty",
        "Ховд аймаг | 2024/06 - 2024/08",
        [
            "Үйлчлүүлэгчийн хэрэгцээг тодруулж, тохирох бүтээгдэхүүн санал болгон борлуулалт хийсэн.",
            "Барааны өрөлт, бүрэн бүтэн байдал, үлдэгдэл, үйлчилгээний чанарт анхаарч ажилласан.",
        ],
    ),
]

first_page = Table([[sidebar, main]], colWidths=[left_w, right_w], hAlign="LEFT")
first_page.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (0, 0), colors.HexColor("#f7fbfd")),
            ("BOX", (0, 0), (0, 0), 0.4, LINE),
            ("LINEBEFORE", (1, 0), (1, 0), 0.6, LINE),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (0, 0), 12),
            ("RIGHTPADDING", (0, 0), (0, 0), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 12),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ("LEFTPADDING", (1, 0), (1, 0), 13),
            ("RIGHTPADDING", (1, 0), (1, 0), 0),
        ]
    )
)

story = [first_page, PageBreak()]

story.extend(
    [
        *section("Онцлох төслүүд"),
        *item(
            "FoodMenu - Digital Menu & POS",
            "Next.js, Spring Boot, PostgreSQL, JPA, WebSocket, QPay",
            [
                "QR цэс, захиалга, QPay төлбөр, кассын POS, баримт хэвлэх урсгалтай ресторан/кафены систем.",
                "Spring Boot REST API болон PostgreSQL дээр захиалгыг боловсруулж, WebSocket ашиглан гал тогооны дэлгэцийг realtime шинэчилсэн.",
                "GitHub: github.com/Ichkko/foodmenuBackendCode | Demo: foodmenu-front.vercel.app/customer?table=5",
            ],
        ),
        *item(
            "Hotel Information System",
            "Java, Spring Boot, MySQL, JWT, React, Next.js",
            [
                "JWT role-based эрх, өрөө ба захиалгын урсгал, хэрэглэгчийн мэдээлэлтэй зочид буудлын систем.",
                "11 database entity бүхий backend бүтцийг эхнээс нь дизайнлаж хэрэгжүүлсэн.",
                "GitHub: github.com/Ichkko/hotelback",
            ],
        ),
        *item(
            "West.mn Training Platform",
            "Astro, TypeScript, JavaScript, Axios, Tailwind CSS",
            [
                "Гэрэлт Ай Ти-ийн сургалтын мэдээлэл, бүртгэл, оролцооны урсгалыг нэг вебсайт дээр нэгтгэсэн.",
                "Live: west.mn",
            ],
        ),
        *item(
            "Student Dormitory Management System",
            "Spring Boot, REST API, MySQL, Next.js, React, Tailwind CSS",
            [
                "Full Stack Hackathon 2026 тэмцээнд багаа ахлан тэргүүн байр эзэлсэн.",
                "Оюутны бүртгэл, өрөө хуваарилалт, засвар үйлчилгээний хүсэлт, төлбөрийн урсгалтай систем.",
                "GitHub: github.com/Ichkko/oyutanback",
            ],
        ),
        Spacer(1, 4),
        *section("Гэрчилгээ"),
        *item(
            "Солонгос хэл - Sejong Korean Language Course 2A",
            "King Sejong Institute Ulaanbaatar 2 | 2024/02/19 - 2024/03/30",
            "Солонгос хэлний дунд түвшний сургалт.",
        ),
        *item(
            "Korean Language Level 1",
            "Changshin University Korean Language Education Center | 2022/11/21 - 2023/01/11",
            "Солонгос хэлний анхан шатны сургалт.",
        ),
        Spacer(1, 4),
        *section("Portfolio"),
        p("https://iichhkuu.vercel.app/", "body"),
    ]
)

doc.build(story)
