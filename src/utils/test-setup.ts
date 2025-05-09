import axios from "axios";
jest.mock("axios");

function setupApiMocks(apiResponses = {}) {
  const defaultResponses = {
    "/users": [
      {
        id: 1,
        name: "김철수",
        email: "kim@example.com",
      },
      {
        id: 2,
        name: "이영희",
        email: "lee@example.com",
      },
    ],
    "/products": [
      {
        id: 1,
        name: "사과",
        price: 1000,
      },
      {
        id: 2,
        name: "바나나",
        price: 2000,
      },
    ],
  };

  const responses = { ...defaultResponses, ...apiResponses };
  const mockedAxios = jest.mocked(axios);
  mockedAxios.get.mockImplementation((url) => {
    for (const [path, data] of Object.entries(responses)) {
      if (url.includes(path)) {
        return Promise.resolve({ data });
      }
    }
    return Promise.reject(new Error("Not found"));
  });
}

export default setupApiMocks;
