import { FormEvent, useEffect, useState } from "react"

type ModalKind = "reservation" | "consult" | "video" | "search" | "clinic" | "notice" | null

const heroSlides = [
  {
    eyebrow: "몸과 마음이 다시, 편안해지는 곳",
    title: ["일상의 건강을", "되찾는 한방의 힘"],
    description: [
      "사람을 먼저 생각하는 다온한방병원이",
      "건강한 하루를 함께 만들어갑니다.",
    ],
    tone: "reception",
  },
  {
    eyebrow: "오늘의 불편함을 세심하게 살피는 곳",
    title: ["내 몸에 꼭 맞는", "정직한 맞춤 진료"],
    description: [
      "충분히 듣고 꼼꼼히 진단하여",
      "한 분 한 분에게 맞는 치료를 제안합니다.",
    ],
    tone: "consulting",
  },
  {
    eyebrow: "전통의 지혜를 오늘의 건강으로",
    title: ["편안한 회복을", "함께 만드는 시간"],
    description: [
      "안전한 의료 시스템과 풍부한 임상 경험으로",
      "건강한 일상에 든든한 힘이 되겠습니다.",
    ],
    tone: "healing",
  },
]

const services = [
  ["✦", "맞춤 한방치료", "개인별 체질과 상태에 맞춘", "1:1 맞춤 치료"],
  ["✿", "안전한 한약 처방", "믿을 수 있는", "청정 한약재 사용"],
  ["⌁", "통증 클리닉", "허리·목·관절 등", "만성 통증 치료"],
  ["♧", "생활질환 클리닉", "소화기·호흡기·여성질환 등", "생활 속 건강 관리"],
  ["✧", "면역·보약 클리닉", "체질 개선과", "면역력 증진"],
]

const clinics = [
  ["통증·척추 클리닉", "허리, 목, 어깨, 무릎 등", "clinic-stone"],
  ["소화기 클리닉", "소화불량, 위장장애 등", "clinic-sand"],
  ["교통사고 후유증 클리닉", "사고 후 통증, 재활 치료", "clinic-sage"],
  ["여성건강 클리닉", "생리통, 갱년기, 여성질환 등", "clinic-rose"],
  ["소아·성장 클리닉", "성장, 면역, 체질 개선", "clinic-green"],
  ["보약·면역 클리닉", "체질 개선, 기력 회복", "clinic-mint"],
]

const rooms = ["진료실", "추나요법실", "한약조제실", "입원실"]

const notices = [
  ["추석 연휴 진료 일정 안내", "2024.09.10"],
  ["특강 해열 한약 프로그램 안내", "2024.09.05"],
  ["진료 예약 시스템 오픈 안내", "2024.08.28"],
]

// 디자인에 반복되는 실내 공간을 CSS 도형으로 재사용하는 컴포넌트입니다.
function InteriorArt({ variant = "default" }: { variant?: string }) {
  return (
    <div className={`interior-art ${variant}`} aria-hidden="true">
      <span className="art-light" />
      <span className="art-highlight" />
      <span className="art-shadow" />
      <span className="art-floor" />
      <span className="art-counter" />
      <span className="art-base" />
    </div>
  )
}

function Header({
  menuOpen,
  setMenuOpen,
  openModal,
}: {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  openModal: (kind: ModalKind) => void
}) {
  const menu = [
    ["병원소개", "about"],
    ["진료안내", "services"],
    ["치료클리닉", "clinics"],
    ["한방건강정보", "health"],
    ["커뮤니티", "community"],
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="다온한방병원 홈">
          <img src="/assets/daon-leaf.svg" alt="" />
          <span>
            <strong>다온한방병원</strong>
            <small>DAON KOREAN MEDICINE HOSPITAL</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="주요 메뉴"
        >
          {menu.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button
            className="search-button"
            type="button"
            onClick={() => openModal("search")}
            aria-label="검색"
          >
            <span aria-hidden="true">⌕</span>
          </button>
          <button
            className="nav-consult"
            type="button"
            onClick={() => openModal("consult")}
          >
            온라인 상담
          </button>
          <button
            className="button primary nav-reserve"
            type="button"
            onClick={() => openModal("reservation")}
          >
            예약하기
          </button>
        </nav>
      </div>
    </header>
  )
}

function Hero({ openModal }: { openModal: (kind: ModalKind) => void }) {
  const [slide, setSlide] = useState(0)
  const current = heroSlides[slide]
  const move = (direction: number) =>
    setSlide(
      (previous) =>
        (previous + direction + heroSlides.length) % heroSlides.length,
    )

  return (
    <section
      className="hero"
      id="top"
      aria-roledescription="carousel"
      aria-label="병원 소개 슬라이드"
    >
      <div className="hero-copy" key={slide}>
        <p className="eyebrow">{current.eyebrow}</p>
        <h1>
          {current.title[0]}
          <br />
          {current.title[1]}
        </h1>
        <p className="hero-description">
          {current.description[0]}
          <br />
          {current.description[1]}
        </p>
        <div className="hero-actions">
          <button
            className="button primary"
            type="button"
            onClick={() => openModal("reservation")}
          >
            진료 예약하기 <span>→</span>
          </button>
          <a className="button light" href="#about">
            병원 소개 보기
          </a>
        </div>
        <div className="hero-pagination" aria-live="polite">
          <span>0{slide + 1}</span>
          <i />
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSlide(index)}
              aria-label={`${index + 1}번 슬라이드`}
            >
              0{index + 1}
            </button>
          ))}
        </div>
        <div className="slider-controls">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="이전 슬라이드"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="다음 슬라이드"
          >
            ›
          </button>
        </div>
      </div>
      <div className={`hero-visual ${current.tone}`}>
        <InteriorArt variant="hero-art" />
      </div>
    </section>
  )
}

function SignatureServices() {
  return (
    <section
      className="signature-services"
      id="services"
      aria-label="주요 진료 특징"
    >
      {services.map(([icon, title, line1, line2]) => (
        <article className="service-item" key={title}>
          <span className="service-icon" aria-hidden="true">
            {icon}
          </span>
          <h2>{title}</h2>
          <p>
            {line1}
            <br />
            {line2}
          </p>
        </article>
      ))}
    </section>
  )
}

function Philosophy({ openModal }: { openModal: (kind: ModalKind) => void }) {
  return (
    <section className="philosophy" id="about">
      <div className="philosophy-visual">
        <InteriorArt variant="philosophy-art" />
      </div>
      <div className="philosophy-copy">
        <p className="section-kicker">
          ━&nbsp;&nbsp; 전통의 지혜, 오늘의 건강으로
        </p>
        <h2>
          사람을 위한
          <br />
          올바른 한방치료
        </h2>
        <p className="section-description">
          다온한방병원은 전통의 가치를 바탕으로
          <br />
          현대인의 건강 고민을 함께 해결합니다.
        </p>
        <div className="care-values">
          {[
            ["♡", "환자 중심 진료"],
            ["♧", "안전한 의료 시스템"],
            ["♙", "풍부한 임상 경험"],
          ].map(([icon, label]) => (
            <div key={label}>
              <span aria-hidden="true">{icon}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </div>
      <button
        className="video-button"
        type="button"
        onClick={() => openModal("video")}
        aria-label="병원 소개 영상 보기"
      >
        <span>▶</span>
        <strong>
          다온한방병원
          <br />
          소개 영상 보기
        </strong>
      </button>
    </section>
  )
}

function Clinics({ openModal }: { openModal: (kind: ModalKind) => void }) {
  return (
    <section className="clinics" id="clinics">
      <div className="section-heading">
        <h2>주요 진료 클리닉</h2>
        <p>
          다양한 한방 진료로
          <br />
          일상의 건강을 지켜드립니다.
        </p>
        <button type="button" onClick={() => openModal("clinic")}>
          전체 진료 보기&nbsp; →
        </button>
      </div>
      <div className="clinic-grid">
        {clinics.map(([title, description, color]) => (
          <button
            className="clinic-card"
            type="button"
            key={title}
            onClick={() => openModal("clinic")}
          >
            <span className={`clinic-art ${color}`}>
              <i />
              <b />
            </span>
            <strong>{title}</strong>
            <small>{description}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)

  return (
    <section className="gallery" id="health">
      <div className="gallery-background">
        <InteriorArt variant="gallery-art" />
      </div>
      <div className="gallery-copy">
        <h2>
          편안함이 머무는
          <br />
          치료 공간
        </h2>
        <p>
          몸과 마음이 모두 편안할 수 있는
          <br />
          쾌적한 진료 환경을 제공합니다.
        </p>
        <button
          className="button light"
          type="button"
          onClick={() => setSelectedRoom(0)}
        >
          병원 둘러보기&nbsp; →
        </button>
      </div>
      <div className="room-list">
        {rooms.map((room, index) => (
          <button
            type="button"
            key={room}
            onClick={() => setSelectedRoom(index)}
          >
            <InteriorArt variant="room-art" />
            <span>{room}</span>
          </button>
        ))}
      </div>

      {selectedRoom !== null && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedRoom(null)}
        >
          <div
            className="room-popup"
            role="dialog"
            aria-modal="true"
            aria-label={`${rooms[selectedRoom]} 보기`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedRoom(null)}
              aria-label="팝업 닫기"
            >
              ×
            </button>
            <InteriorArt variant="room-popup-art" />
            <div className="room-popup-footer">
              <button
                type="button"
                onClick={() =>
                  setSelectedRoom(
                    (selectedRoom + rooms.length - 1) % rooms.length,
                  )
                }
                aria-label="이전 공간"
              >
                ‹
              </button>
              <strong>{rooms[selectedRoom]}</strong>
              <button
                type="button"
                onClick={() =>
                  setSelectedRoom((selectedRoom + 1) % rooms.length)
                }
                aria-label="다음 공간"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Information({ openModal }: { openModal: (kind: ModalKind) => void }) {
  return (
    <footer className="information" id="community">
      <section className="notices">
        <div className="info-title">
          <h2>공지사항</h2>
          <button type="button" onClick={() => openModal("notice")}>
            더보기&nbsp; +
          </button>
        </div>
        <ul>
          {notices.map(([title, date]) => (
            <li key={title}>
              <button type="button" onClick={() => openModal("notice")}>
                {title}
              </button>
              <time>{date}</time>
            </li>
          ))}
        </ul>
      </section>
      <section className="testimonial">
        <h2>환자분들의 이야기</h2>
        <blockquote>
          “꾸준한 치료로 허리 통증이 많이 좋아졌어요.
          <br />
          친절하고 세심한 진료에 늘 감사합니다.”
        </blockquote>
        <p>김○○ 님&nbsp; | &nbsp;허리 통증 치료</p>
      </section>
      <section className="location">
        <h2>오시는 길</h2>
        <div className="map-placeholder" aria-label="병원 위치 지도">
          <span>●</span>
        </div>
        <address>
          경상남도 진주시 진주대로 123
          <br />
          다온한방병원
        </address>
        <a
          className="text-link"
          href="https://maps.google.com/?q=경상남도+진주시+진주대로+123"
          target="_blank"
          rel="noreferrer"
        >
          지도에서 보기&nbsp; →
        </a>
      </section>
      <section className="contact">
        <h2>진료 예약 및 상담</h2>
        <a className="phone" href="tel:0551234567">
          ☎&nbsp; 055-123-4567
        </a>
        <p>
          평일&nbsp;&nbsp;&nbsp;&nbsp; 09:00 - 18:00
          <br />
          토요일&nbsp;&nbsp; 09:00 - 13:00
          <br />
          점심시간&nbsp; 12:30 - 13:30
        </p>
        <div>
          <button
            className="button light"
            type="button"
            onClick={() => openModal("reservation")}
          >
            진료 예약하기 →
          </button>
          <button
            className="contact-consult"
            type="button"
            onClick={() => openModal("consult")}
          >
            온라인
            <br />
            상담 →
          </button>
        </div>
      </section>
    </footer>
  )
}

function Modal({ kind, close }: { kind: ModalKind close: () => void }) {
  useEffect(() => {
    if (!kind) return
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && close()
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [kind, close])

  if (!kind) return null

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.alert(
      kind === "reservation"
        ? "예약 신청이 접수되었습니다."
        : "상담 문의가 접수되었습니다.",
    )
    close()
  }

  const titles: Record<Exclude<ModalKind, null>, string> = {
    reservation: "진료 예약하기",
    consult: "온라인 상담",
    video: "다온한방병원 소개",
    search: "사이트 검색",
    clinic: "전체 진료 클리닉",
    notice: "공지사항",
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={close}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={close}
          aria-label="팝업 닫기"
        >
          ×
        </button>
        <p className="modal-kicker">DAON KOREAN MEDICINE HOSPITAL</p>
        <h2 id="modal-title">{titles[kind]}</h2>

        {(kind === "reservation" || kind === "consult") && (
          <form className="modal-form" onSubmit={submit}>
            <label>
              성함
              <input name="name" required placeholder="성함을 입력해 주세요" />
            </label>
            <label>
              연락처
              <input
                name="phone"
                required
                type="tel"
                placeholder="010-0000-0000"
              />
            </label>
            {kind === "reservation" ? (
              <label>
                희망 진료일
                <input name="date" required type="date" />
              </label>
            ) : (
              <label>
                상담 내용
                <textarea
                  name="message"
                  required
                  placeholder="궁금한 내용을 남겨 주세요"
                />
              </label>
            )}
            <button className="button primary" type="submit">
              {kind === "reservation" ? "예약 신청하기" : "상담 접수하기"}
            </button>
          </form>
        )}

        {kind === "search" && (
          <form
            className="search-form"
            onSubmit={(event) => {
              event.preventDefault()
              const input = new FormData(event.currentTarget).get("query")
              window.alert(`“${input}” 검색 결과는 준비 중입니다.`)
            }}
          >
            <input
              name="query"
              required
              autoFocus
              placeholder="검색어를 입력해 주세요"
            />
            <button className="button primary" type="submit">
              검색
            </button>
          </form>
        )}

        {kind === "video" && (
          <div className="video-placeholder">
            <InteriorArt variant="video-art" />
            <span>▶</span>
            <p>사람을 먼저 생각하는 다온한방병원을 소개합니다.</p>
          </div>
        )}

        {kind === "clinic" && (
          <div className="modal-clinics">
            {clinics.map(([title, description]) => (
              <a key={title} href="tel:0551234567">
                <strong>{title}</strong>
                <span>{description}</span>
                <i>전화 문의 →</i>
              </a>
            ))}
          </div>
        )}

        {kind === "notice" && (
          <div className="modal-notices">
            {notices.map(([title, date], index) => (
              <article key={title}>
                <time>{date}</time>
                <h3>{title}</h3>
                <p>
                  {index === 0
                    ? "연휴 기간 중 진료 일정이 일부 변경됩니다. 내원 전 대표전화로 진료 가능 시간을 확인해 주세요."
                    : "자세한 내용은 대표전화 055-123-4567로 문의해 주세요."}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<ModalKind>(null)

  return (
    <div className="page-shell">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openModal={setModal}
      />
      <main>
        <Hero openModal={setModal} />
        <SignatureServices />
        <Philosophy openModal={setModal} />
        <Clinics openModal={setModal} />
        <Gallery />
      </main>
      <Information openModal={setModal} />
      <Modal kind={modal} close={() => setModal(null)} />
    </div>
  )
}
