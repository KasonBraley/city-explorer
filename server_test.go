package city_test

import (
	"city-explorer"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRoutes(t *testing.T) {
	cases := []struct {
		route string
	}{
		{route: "/"},
		{route: "/movies?city=mesa"},
		{route: "/weather?lon=69&lat=09"},
		{route: "/location?city=mesa"},
		{route: "/location/image?lat=33.4151117&lon=-111.8314792"},
	}

	for _, test := range cases {
		t.Run(fmt.Sprintf("Get %q returns 200", test.route), func(t *testing.T) {
			server := city.NewCityServer()

			request := newGetRequest(test.route)
			response := httptest.NewRecorder()

			server.ServeHTTP(response, request)

			assertStatus(t, response, http.StatusOK)
		})
	}
}

func newGetRequest(route string) *http.Request {
	req, _ := http.NewRequest(http.MethodGet, route, nil)
	return req
}

func assertStatus(t testing.TB, got *httptest.ResponseRecorder, want int) {
	t.Helper()
	fmt.Println(got.Code)
	if got.Code != want {
		t.Errorf("did not get correct status, got %d, want %d", got.Code, want)
	}
}
