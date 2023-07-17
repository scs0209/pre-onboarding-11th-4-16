# 🌱 프리온보딩 프론트엔드 과제 Week 4 성창수

## 프로젝트 소개

- 검색어 추천, 캐싱, 및 만료 기간(expire time) 설정을 포함한 검색 결과를 보여주는 애플리케이션입니다.

## 😊 개발자 소개

|                                                            성창수                                                            |
| :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/jsdmas/jsdmas.github.io/assets/105098581/e237b4f3-26f3-4a37-8818-86787f5d858b" width="160px" /> |
|                                       [🙎🏻‍♂️ FE 팀원 : 창수](https://github.com/scs0209)                                        |
|                                                                                                                              |

## 프로젝트 특징

- 검색어 추천 기능입력마다 API 호출하지 않도록 debounce 처리로컬 캐싱 및 만료 기간 설정키보드로 추천 검색어 이동 가능

---

## 🛠️ 사용 라이브러리 및 스택

- formatter : ![Eslint](https://img.shields.io/badge/Eslint-blue), ![Prettier](https://img.shields.io/badge/Prettier-pink), ![Husky](https://img.shields.io/badge/Husky-red)
- API : ![Axios](https://img.shields.io/badge/Axios-yellow)
- Style : ![Emotion](https://img.shields.io/badge/Emotion-green)
- Language: ![React](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white), ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=TypeScript&logoColor=white)

## 프로젝트 기간

- 2023.07.16 ~ 2023.07.19

## 🔧 설치 및 실행

**깃 클론**

```
git clone https://github.com/scs0209/pre-onboarding-11th-4-16.git
```

---

**프로젝트 디렉토리 이동**

**프론트엔드**

```
cd pre-onboarding-11th-4-16
```

**백엔드**

```
cd pre-onboarding-11th-4-16
cd assignment-api-master
```

---

**필요한 패키지 설치**

```
npm install
```

**프로젝트를 실행**

```
npm start
```

## How to use

- 키보드를 사용하여 추천 검색어를 이용할 수 있습니다. `↑`와 `↓` 키를 사용하여 검색어 목록에서 상하로 이동할 수 있습니다. 선택한 검색어를 적용하려면 `Enter` 키를 누릅니다.

## Cache 기능

**이 프로젝트에서는 입력 값을 토대로 생성된 데이터를 로컬 객체(variable)에 캐시로 저장합니다. 이렇게 하면 동일한 검색어가 재입력되면 API 호출을 하지 않고 캐싱된 값을 빠르게 반환할 수 있습니다.**

**캐싱 로직은 `searchData` 함수에 구현됩니다. 캐시는 `cache` 객체를 사용하여 관리되며, 각 캐시 항목에 만료 시간(expiry)을 설정하여 일정 시간이 지나면 캐시가 무효화되도록 합니다.**

**만료 시간을 초과하면 API를 호출하고 새로운 만료 시간을 설정합니다. 이 프로세스를 통해 항상 상대적으로 최신 데이터를 사용할 수 있습니다.**

## Debounce 기능

**이 프로젝트에서는 검색 양식의 입력 이벤트와 관련하여 debounce 처리를 구현하여 API 호출 횟수를 줄입니다. 사용자가 검색어를 빠르게 입력할 때 과도한 API 호출을 방지하고 입력이 완료되면 호출되도록 합니다.**

**DataProvider 컴포넌트에서 useEffect를 사용하여 입력값이 변경될 때마다 API 호출을 실행하던 것을 디바운스 기능을 적용하여, 입력값에 대한 변경이 끝난 이후에만 API 호출을 실행하도록 변경합니다. 이렇게 하면, 사용자의 입력이 긴 문장으로 이루어지거나, 불필요한 입력이 있더라도 일정 시간 동안 입력값이 변경되지 않으면 불필요한 API 호출을 실행하지 않아 불필요한 서버 부하를 줄일 수 있습니다.**

```
src/
├── components/           // 컴포넌트들
│   └── SearchBar/
│         └── SearchBar.tsx
├── api/
│   └── index.ts
├── context/
│   └── DataContext.ts
├── hooks/
│   └── useKeyNavigation.ts
├── utils/                // 유틸리티 함수
│   └── debounce.ts
├── styles/
│   └── SearchBar.ts
├── App.tsx               // 라우터와 레이아웃 컴포넌트
├── index.tsx             // 앱 엔트리 포인트
└── react-app-env.d.ts    // CRA 타입 정의
```
