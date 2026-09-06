import React from "react";
import { PLATFORMS } from "../data";
import { SectionTitle } from "./Common";

export default function AboutTab() {
  return (
  <main className="subpage">
    <section className="page-shell sub-hero">
      <span className="eyebrow">밤하늘극장 소개</span>

      <h1>
        노래에서 시작된 이야기를
        <br />
        하나의 <em>세계로.</em>
      </h1>

      <p>
        밤하늘극장은 한 곡의 노래에서 시작된 감정과 이야기를
        가사, 캐릭터, 비주얼, 영상으로 확장하며
        우리만의 세계를 만들어가는 버츄얼 인디 밴드이자
        독립 음악 프로젝트입니다.
      </p>
    </section>

    <section className="about-image-band">
      <div className="about-image" />
    </section>

    <section className="section page-shell two-column-copy">
      <div>
        <span className="eyebrow">우리가 바라보는 것</span>

        <h2>
          아름답기 때문에
          <br />
          노래하는 것이 아니라,
          <br />
          사라지기 때문에 기록합니다.
        </h2>
      </div>

      <div className="long-copy">
        <p>
          밤하늘극장은 완벽한 사람보다 흔들리는 사람,
          거대한 성공보다 오늘을 버텨낸 작은 마음,
          영원함보다 언젠가 사라질 것들의 순간을 바라봅니다.
        </p>

        <p>
          그래서 우리의 음악은 한 곡으로 끝나지 않습니다.
          노래 안에 담긴 감정과 이야기를 앨범의 문장과 커버,
          캐릭터와 영상으로 이어가며
          하나의 작품 세계로 오래 남겨가고 있습니다.
        </p>
      </div>
    </section>

    <section className="section section-dark">
  <div className="page-shell">
    <SectionTitle
      kicker="브랜드 아이덴티티"
      title="밤하늘극장 · NIGHT SKY THEATER"
      body="서로 다른 점들이 만나 하나의 우주가 되듯, 밤하늘극장의 CI는 별과 달, 그리고 그 사이를 이어가는 하나의 궤도를 통해 음악과 이야기가 연결되는 과정을 표현합니다."
    />

<div className="identity-panel">
  <div
    className="identity-symbol"
    style={{
      backgroundImage: "url('/favicon.svg')",
      backgroundSize: "62%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: "#B8FF00",
    }}
  />

      <div>
        <span>CI · 브랜드 심볼</span>

        <h3>밤하늘극장</h3>

        <p>
          밤하늘극장의 심볼은 별과 달, 그리고 그 사이를 이어가는
          하나의 궤도를 형상화했습니다. 서로 다른 점들이 선으로 이어지고
          마침내 하나의 세계를 이루듯, 밤하늘극장의 음악 또한 각자의
          마음과 이야기가 만나 새로운 의미를 만들어가는 과정을 담고 있습니다.
        </p>

        <p>
          중심에서 빛나는 별은 끝내 놓치고 싶지 않은 마음을,
          서로를 감싸며 이어지는 궤도는 수많은 밤과 감정이 연결되어
          만들어지는 밤하늘극장의 세계를 상징합니다.
        </p>

        <p>
          선명한 라임 컬러는 어두운 밤 속에서도 사라지지 않는 작은 빛을
          뜻합니다. 흔들리고 무너지는 순간에도 다시 다음 점을 향해 나아가듯,
          밤하늘극장은 음악을 통해 우리가 지나온 밤을 기록하고
          앞으로 이어질 이야기를 그려갑니다.
        </p>
      </div>
    </div>
  </div>
</section>

    <section className="section page-shell">
      <SectionTitle
  kicker="음원 및 소셜 채널"
  title={
    <>
      밤하늘극장을
      <br />
      다양한 플랫폼에서 만나보세요.
    </>
  }
/>
<div className="platform-logo-grid">
  {PLATFORMS.map((platform) => (
    <a
      key={platform.name}
      href={`https://${platform.url}`}
      target="_blank"
      rel="noreferrer"
      className="platform-logo-card"
      style={{
        borderColor: platform.color,
      }}
      aria-label={`${platform.name}에서 밤하늘극장 보기`}
    >
      <img
        src={platform.logo}
        alt=""
        draggable="false"
      />

      <span>{platform.name}</span>
    </a>
  ))}
</div>
    </section>

    </main>
  );
}