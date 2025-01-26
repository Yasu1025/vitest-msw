import { graphql, HttpResponse } from "msw";
import { mockRepositories } from "@/__tests__/utils.test";

export const handlers = [
  graphql.query("GET_USER", ({ query, variables }) => {
    console.log("Intercepted GetUser GraphQL query", query);
    const { login } = variables;

    if (login === "request-error") {
      return HttpResponse.json({
        errors: [{ message: "There was an error" }],
      });
    }

    if (login === "invalid-username") {
      return HttpResponse.json({
        data: {
          user: null,
        },
        errors: [
          { message: `Could not resolve to a User with the login of ${login}` },
        ],
      });
    }

    return HttpResponse.json({
      data: {
        user: login,
        avatarUrl: `https://github.com/images/${login}.jpg`,
        bio: "Full-stack Developer",
        url: `https://github.com/${login}`,
        repositories: {
          totalCount: 11,
          nodes: mockRepositories,
        },
        followers: {
          totalCount: 12,
        },
        following: {
          totalCount: 13,
        },
        gists: {
          totalCount: 14,
        },
      },
    });
  }),
];
