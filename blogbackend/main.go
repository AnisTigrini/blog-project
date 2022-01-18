package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"logmein.go/blogbackend/posts"
)

func main() {
	router := gin.Default()
	
	router.Use(cors.New(cors.Config{
        AllowOrigins: []string{"*"},
        AllowMethods: []string{"POST", "PUT", "PATCH", "DELETE"},
        AllowHeaders: []string{"Content-Type,access-control-allow-origin, access-control-allow-headers"},
    }))

	dataroutes := router.Group("/api")
	
	dataroutes.GET("/posts", getPostsHandler)
	dataroutes.POST("/posts", submitPostHandler)
	dataroutes.POST("/edit-post", editPostHandler)
	dataroutes.GET("/stop", stopHandler)


	router.Run(":8080")
}

func stopHandler(c *gin.Context) {
	os.Exit(1)
}

func getPostsHandler(c *gin.Context) {
	postsList, _, err := posts.GetAllPosts()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, "Ressources not found")
	}
	c.IndentedJSON(http.StatusOK, postsList)
}

func submitPostHandler(c *gin.Context) {
	post, err := posts.New()
	if err != nil {
		fmt.Println(err)
	}
	if c.BindJSON(&post) != nil {
		c.IndentedJSON(http.StatusNotModified, "Format Failiure")
	}
	err = post.AddToFile()
	if err != nil {
		c.IndentedJSON(http.StatusNotModified, "Error, was not able to add to the file")
	}
}

func editPostHandler(c *gin.Context) {
	var post posts.Post
	if c.BindJSON(&post) != nil {
		c.IndentedJSON(http.StatusNotModified, "Format Failiure")
	}

	err := post.EditPost()
	if err != nil {
				c.IndentedJSON(http.StatusNotModified, "Error, was not able to add to the file")

	}
}