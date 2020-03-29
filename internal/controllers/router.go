package controllers

import (
	"net/http"
)

func init() {
	r := http.NewServeMux()
	r.Handle("/covid", covid{})
	http.ListenAndServe(":44000", r)
}