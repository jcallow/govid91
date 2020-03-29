package controllers

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)


type covid struct {

}

func (c covid) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	url := "https://bing.com/covid/data"

	w.Header().Set("Access-Control-Allow-Origin", "*")

	client := http.Client{
		Timeout: time.Second*10,
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)

	if err != nil {
		log.Fatal(err)
	}

	res, getErr := client.Do(req)

	if getErr != nil {
		log.Fatal(getErr)
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	body, readErr := ioutil.ReadAll(res.Body)

	if readErr != nil {
		log.Fatal(readErr)
	}

	fmt.Fprint(w, string(body))
}
