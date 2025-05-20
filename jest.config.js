/** @type {import("ts-jest").JestConfigWithTsJest} */
export default {
    verbose: true,
    testEnvironment: "node",
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: [
        "ts"
    ],
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
        "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
}


