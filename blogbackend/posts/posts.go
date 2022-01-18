package posts

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/segmentio/ksuid"
)

type Post struct {
	PostId string `json:"PostId"`
	PostDate string
	Author string `json:"authorName"`
	PostDescription string `json:"postDescription"`
}

func New() (*Post, error) {
	newPost := &Post{
		PostId: ksuid.New().String(),
		PostDate: time.Now().Format("02 Jan 06 15:04 MST"),
	}

	return newPost, nil
}

func GetAllPosts() ([]Post, string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return nil, "", err
	}

	fileName := pwd + "/data/posts.json"
	_, err = os.Stat(fileName)
	if err != nil {
		initialJsonText := "[]"

		e := ioutil.WriteFile(fileName, []byte(initialJsonText), 0644)
		if e != nil {
			return nil, fileName, e
		}
		
	}

	postFile, err := ioutil.ReadFile(fileName)
	if err != nil {
		return nil, fileName, err
	}

	postList := []Post{}
	err = json.Unmarshal(postFile, &postList)
	if err != nil {
		return nil, fileName, err
	}

	return postList, fileName, nil
}

func (p *Post) AddToFile() error {
	postList, fileName, err := GetAllPosts()
	if err != nil {
		return err
	}
	
	postList = append(postList, *p)

	postDataBytes, err := json.MarshalIndent(postList, "", " ")
    if err != nil {
        return err
    }

	err = ioutil.WriteFile(fileName, postDataBytes, 0644)
	if err != nil {
		return err
	}

	return nil
}

func (p *Post) EditPost() error {
	postList, fileName, err := GetAllPosts()
	if err != nil {
		return err
	}

	i := findPost(p.PostId, &postList)
	fmt.Print("this is the index",i)

	if i != -1 {
		postList[i].PostDate = time.Now().Format("02 Jan 06 15:04 MST")
		postList[i].PostDescription = p.PostDescription
		postList[i].Author = p.Author

		postDataBytes, err := json.MarshalIndent(postList, "", " ")
		if err != nil {
			return err
		}
	
		err = ioutil.WriteFile(fileName, postDataBytes, 0644)
		if err != nil {
			return err
		}

		return nil
	} else {
		return fmt.Errorf("error reading the post")
	}
}

func findPost(postId string, postList *[]Post) int {
	for i, p := range *postList {
		if  p.PostId == postId {
			return i
		}
	}
	return -1
}

