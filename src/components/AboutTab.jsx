import React from "react";
import { PLATFORMS } from "../data";
import { SectionTitle } from "./Common";

export default function AboutTab() {
  return (
  <main className="subpage">
    <section className="page-shell sub-hero">
      <span className="eyebrow">밤하늘극장 소개</span>

      <h1>
        하루의 마지막
        <br />
        모두가 <em>주인공</em>이 되는 곳.
      </h1>

<div className="hero-copy">
  <p>
    우리는 꿈과 사랑, 걱정과 책임을 짊어진 채 정신없는 하루를 살아갑니다.
  </p>

  <p>
    그리고 하루의 소음이 모두 멎은 밤에야, 비로소 자신의 마음과 지나온 시간을 돌아보게 됩니다.
  </p>

  <p>
    밤하늘극장은 그때 누구에게나 펼쳐지는 밤하늘을 하나의 거대한 극장으로 바라보며 시작되었습니다.
  </p>

  <p className="paragraph-break">
    밤하늘극장의 노래가 누군가의 삶을 대신 살아주거나 모든 아픔을 해결해줄 수는 없습니다.
  </p>

  <p>
    다만 가장 외롭고 고요한 밤, “당신만 이런 밤을 살아가는 것은 아니다”라는 마음으로
  </p>
  <p>
    한 사람의 긴 하루 곁에 조용히 머물 수 있기를 바랍니다.
  </p>
</div>
    </section>

    <section className="about-image-band">
      <div className="about-image" />
    </section>

<section className="section page-shell two-column-copy">
  <div>
    <span className="eyebrow">우리가 바라보는 것</span>

    <h2>
      표현하는 방식은 달라져도,
      <br />
      전하고 싶은 마음은 같습니다.
    </h2>
  </div>

  <div className="long-copy">
    <p>
      밤하늘극장 이전에는 ‘해피인’이라는 이름으로 인스타툰을 그리며
      사람들의 일상과 감정을 공감과 위로의 이야기로 표현해왔습니다.
      동시에 AI 음악이 대중화되기 전부터 비트와 음악 작업을 이어왔고,
      그림으로 전하던 이야기를 음악으로 확장하며
      지금의 버츄얼 인디 밴드 ‘밤하늘극장’을 만들게 되었습니다.
    </p>

    <p>
      목소리와 제작 과정의 일부는 기술의 힘을 빌리고 있지만,
      그 사실을 숨기지 않고 투명하게 알리는 것을 원칙으로 합니다.
      어떤 방식으로 만들어졌는지를 알고 들어도 마음에 남는 음악,
      기술보다 그 안의 감정과 이야기가 먼저 기억되는 작품을 만들고 싶습니다.
    </p>

    <p>
      표현하는 방식은 앞으로도 달라질 수 있습니다.
      하지만 지나가는 청춘과 사랑, 상실과 위로의 순간들을 기록하고,
      누군가의 긴 하루 곁에 머물 수 있는 이야기를 만들겠다는 마음은
      변하지 않을 것입니다.
    </p>
  </div>
</section>

    <section className="section section-dark">
  <div className="page-shell">

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
        <span>브랜드 아이덴티티 · CI</span>

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