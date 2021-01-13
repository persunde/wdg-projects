package types

// 4chan types //

// CatalogPageJSON list threads in the catalog
// NOTE: Use a list of these when fetching the data
type CatalogPageJSON struct {
	Page    uint
	Threads []CatalogThreadJSON
}

// CatalogThreadJSON data about one thread in a catalog JSON structure
type CatalogThreadJSON struct {
	No        uint
	Resto     uint
	Closed    uint   //Optional ?Maybe set to uint? is 0 or 1
	Time      uint   //Unix timestamp
	Name      string //poster name
	Sub       string // Subject
	Com       string //comment
	Replies   uint
	Bumplimit uint //?Maybe set to uint? is 0 or 1
}

// ThreadListJSON List of threads data on a given board
type ThreadListJSON struct {
	Page         uint
	Threads      []string
	No           uint
	LastModified uint `json:"last_modified"`
	Replies      int
}

// ThreadJSON all posts in a thread
type ThreadJSON struct {
	Posts []PostJSON
}

// PostJSON data from a single post
type PostJSON struct {
	// NOTE: All bool's might be need to be uint instead
	No             uint
	Resto          uint
	Closed         uint   //Optional ?Maybe set to uint? is 0 or 1
	Time           uint   //Unix timestamp
	ImageID        uint   `json:"Tim"`
	ImageExtention string `json:"ext"`
	Name           uint   //poster name
	Com            string //comment
	Replies        uint
	Bumplimit      uint //?Maybe set to uint? is 0 or 1
	Archived       uint //?Maybe set to uint? is 0 or 1
}

// ThreadResult contains data about the parsed result from a thread containing job-searching posts
type ThreadResult struct {
	postResultList []PostResult
}

// PostResult contains data about the parsed result of a project post
type PostResult struct {
	Title    string
	Dev      string
	Tools    string
	Link     string
	Repo     string
	Progress string
	PostNo   uint   `json:"No"`
	Image    string // as Base64
}
