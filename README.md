# 강민규 교수 홈페이지 · Min-Gyu Kang homepage

충북대학교 의과대학 내과학교실 강민규 부교수(충북대학교병원 알레르기내과)의 소개 홈페이지. 진료 차트를 열고 서식을 넘기며 연구, R&D 프로젝트, 임상시험, 특허, 논문, 이력, 보도를 봅니다.

- 한국어: `/` (`index.html`) · English: `/en/` (`en/index.html`). 두 판은 `assets/` 와 `attachments/` 를 함께 씁니다. 상단의 KO | EN 스위치로 오갑니다.
- 정적 사이트입니다. 서버 설정 없이 어디서든 열립니다.
- 원본과 빌드 스크립트는 로컬 작업 폴더 `homepage/design/` 에 있습니다. 내용을 고친 뒤 아래 순서로 이 폴더를 다시 만들고 커밋하면 GitHub Pages 에 반영됩니다.

```
node build-chart.mjs            # 한국어 페이지 (chart.dev.html)
node build-en.mjs               # 영어 페이지: data/en/map.json 의 번역을 적용 (chart.dev.en.html). 새 한국어 문장은 '미번역'으로 보고됩니다
node build-site.mjs             # site/index.html + assets + attachments
node build-site.mjs en          # site/en/index.html
```

새로 생긴 한국어 문장을 번역할 때: `node i18n.mjs extract chart.dev.html data/en/units.json` 으로 단위를 뽑고, `node i18n-batch.mjs prep …` 으로 묶은 뒤 번역 결과를 `node i18n-batch.mjs merge …` 로 `data/en/map.json` 에 합칩니다. 용어와 문체는 `data/en/GLOSSARY.md` 를 따릅니다.
