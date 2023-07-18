# 🌱 프리온보딩 프론트엔드 과제 Week 4 성창수

## 프로젝트 소개

- 검색어 추천, 캐싱, 및 만료 기간(expire time) 설정을 포함한 검색 결과를 보여주는 애플리케이션입니다.

## 프로젝트 기간

- 2023.07.16 ~ 2023.07.19

## 😊 개발자 소개

|                                                            성창수                                                            |
| :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/jsdmas/jsdmas.github.io/assets/105098581/e237b4f3-26f3-4a37-8818-86787f5d858b" width="160px" /> |
|                                       [🙎🏻‍♂️ FE 팀원 : 창수](https://github.com/scs0209)                                        |
|                                                                                                                              |

## 🛠️ 사용 라이브러리 및 스택

- formatter : ![Eslint](https://img.shields.io/badge/Eslint-blue), ![Prettier](https://img.shields.io/badge/Prettier-pink), ![Husky](https://img.shields.io/badge/Husky-red)
- API : ![Axios](https://img.shields.io/badge/Axios-yellow)
- Style : ![Emotion](https://img.shields.io/badge/Emotion-green)
- Language: ![React](https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white), ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=TypeScript&logoColor=white)

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

## 과제 목표

✅ 검색창 구현 <br>
✅ 검색어 추천 기능 구현 <br>
✅ 캐싱 기능 구현

## 🎈 구현 기능

- 캐싱 기능
- 디바운스 기능(API 호출 줄이기)
- 추천 검색어 기능

## 🤔캐싱 기능과 고려 사항

### 1. 캐싱 기능의 필요성

이 프로젝트에서는 메모리 캐싱 기법으로 검색어 추천 결과를 캐싱하고 있습니다. 캐싱을 활용함으로써 사이트의 성능 향상 및 서버 부하 감소를 도모할 수 있습니다.

### 2. 고려 사항

- 캐싱된 데이터가 만료되는 시점을 설정해야 함. 이를 통해 오래된 데이터를 제거하고, 새로운 데이터를 사용할 수 있다
- 데이터를 저장할 저장소 선택(Web Storage, DB, Cache API 등)

### 3. 선택한 캐싱 기법 사용 이유

- 간편한 구현: 메모리 캐싱을 사용하면 일부 코드만으로 캐싱과 관련된 모든 로직을 구현할 수 있다.
- 간단한 데이터 구조: 이 프로젝트에서는 복잡한 데이터 구조를 다루지 않기 때문에, 메모리 캐싱이 적합하다.
- 즉, 이 프로젝트에서는 서버에 저장할 필요가 없는 일시적인 데이터를 저장하기 때문에 적합한 선택했다.

### 4. 단점

- 메모리 사용량: 큰 데이터 셋을 저장하기에는 부적합, 객체에 대한 참조를 메모리에 저장해야 하기 때문에 저장된 객체들이 사라지지 않으면 이로 인해 메모리 사용량이 증가.
- 지속성이 없음: 서버가 다시 시작되거나, 종료되는 경우, 메모리에 저장된 캐시 데이터도 사라진다. 지속성이 필요한 경우 다른 캐싱 기법 활용

### 5. 구현 방법

**캐시 데이터 유형 정의**

- 먼저 캐시 데이터에 대한 인터페이스를 정의한다.

```typescript
type CacheData = {
  expirationTime: number;
  data: string[];
};
```

**캐시 객체 및 캐시 사용 기간 설정**

- 캐시 객체를 정의하고, 데이터를 얼마 동안 캐시에 보관할지를 정하는 캐시 사용 기간 변수를 설정한다.

```typescript
const cache: Record<string, CacheData> = {};
const cacheLifetime = 5 * 60 * 1000;
```

**데이터 만료 확인 및 캐시에서 데이터 가져오기**

- 데이터가 캐시에 있는지 확인한 후, 만료된 경우 캐시에서 삭제하고 아닐 경우 데이터를 반환한다.

```typescript
const getFromCache = (query: string): string[] | null => {
  if (query in cache && cache[query].expirationTime > Date.now()) {
    console.log(cache);
    return cache[query].data;
  }
  return null;
};
```

**캐시에 데이터 저장**

- 검색어오ㅘ 가져온 데이터를 캐시에 저장하는 함수를 만들어 캐시에서 사용할 수 있게 저장

```typescript
const saveToCache = (query: string, data: string[]) => {
  cache[query] = {
    expirationTime: Date.now() + cacheLifetime,
    data,
  };
};
```

### 6. 만료 시간 구현 방법

- 만료 시간은 `Date.now()`를 사용하여 현재 시간을 가져온 후, 캐시 사용 기간을 더해 저장한다.

```typescript
expirationTime: Date.now() + cacheLifetime;
```

## 키보드를 사용한 검색어 추천 기능

이 프로젝트에서는 제공하는 검색어 추천 기능은 키보드 이벤트를 지원하여 사용자가 키보드만으로도 효율적으로 검색어를 선택할 수 있습니다.

### How to use

- 키보드를 사용하여 추천 검색어를 이용할 수 있습니다. `↑`와 `↓` 키를 사용하여 검색어 목록에서 상하로 이동할 수 있습니다. 선택한 검색어를 적용하려면 `Enter` 키를 누릅니다.
- 목록의 첫 번째 검색어에서 `↑` 키를 누르면 마지막 검색어로 이동합니다.
- 목록의 마지막 검색어에서 `↓` 키를 누르면 첫 번째 검색어로 이동합니다.

## Debounce 기능

**이 프로젝트에서는 검색 양식의 입력 이벤트와 관련하여 debounce 처리를 구현하여 API 호출 횟수를 줄입니다. 사용자가 검색어를 빠르게 입력할 때 과도한 API 호출을 방지하고 입력이 완료되면 호출되도록 합니다.**

**DataProvider 컴포넌트에서 useEffect를 사용하여 입력값이 변경될 때마다 API 호출을 실행하던 것을 디바운스 기능을 적용하여, 입력값에 대한 변경이 끝난 이후에만 API 호출을 실행하도록 변경합니다. 이렇게 하면, 사용자의 입력이 긴 문장으로 이루어지거나, 불필요한 입력이 있더라도 일정 시간 동안 입력값이 변경되지 않으면 불필요한 API 호출을 실행하지 않아 불필요한 서버 부하를 줄일 수 있습니다.**

```
src/
├── 📂components/           // 컴포넌트들
│   └── 📂SearchBar/
│         └── SearchBar.tsx
├── 📂api/
│   └── index.ts
├── 📂context/
│   └── DataContext.ts
├── 📂hooks/
│   └── useKeyNavigation.ts
├── 📂utils/                // 유틸리티 함수
│   └── debounce.ts
├── 📂styles/
│   └── SearchBar.ts
├── App.tsx               // 라우터와 레이아웃 컴포넌트
├── index.tsx             // 앱 엔트리 포인트
└── react-app-env.d.ts    // CRA 타입 정의
```

## ❤ git commit message 컨벤션

| 커밋 유형 | 의미                       |
| --------- | -------------------------- |
| feat      | 새로운 기능 추가           |
| fix       | 버그, 기능 수정            |
| Docs      | 문서 수정                  |
| style     | 스타일 코드 추가           |
| refactor  | 코드 리팩토링              |
| chore     | 기능과 관련 없는 내용 수정 |

---
