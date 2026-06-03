import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost, BlogCategory, InsertBlogPost, InsertBlogCategory } from "@/lib/schema";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

function BlogAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data
  const { data: posts = [], isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<BlogCategory[]>({
    queryKey: ["/api/blog/categories"],
  });

  // State for forms
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);

  // Form data
  const [postForm, setPostForm] = useState<Partial<InsertBlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    tags: [],
    isPublished: false,
  });

  const [categoryForm, setCategoryForm] = useState<Partial<InsertBlogCategory>>({
    name: "",
    slug: "",
    description: "",
  });

  const [tagInput, setTagInput] = useState("");

  // Mutations
  const createPostMutation = useMutation({
    mutationFn: (data: InsertBlogPost) => apiRequest("/api/blog/posts", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Success", description: "Post created successfully" });
      resetPostForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create post", variant: "destructive" });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) =>
      apiRequest(`/api/blog/posts/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Success", description: "Post updated successfully" });
      resetPostForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update post", variant: "destructive" });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/blog/posts/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Success", description: "Post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete post", variant: "destructive" });
    },
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, publish }: { id: string; publish: boolean }) =>
      apiRequest(`/api/blog/posts/${id}/${publish ? "publish" : "unpublish"}`, "PATCH"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/posts"] });
      toast({ title: "Success", description: "Post status updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update post status", variant: "destructive" });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: (data: InsertBlogCategory) => apiRequest("/api/blog/categories", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/categories"] });
      toast({ title: "Success", description: "Category created successfully" });
      resetCategoryForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create category", variant: "destructive" });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertBlogCategory> }) =>
      apiRequest(`/api/blog/categories/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/categories"] });
      toast({ title: "Success", description: "Category updated successfully" });
      resetCategoryForm();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update category", variant: "destructive" });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/blog/categories/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog/categories"] });
      toast({ title: "Success", description: "Category deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete category", variant: "destructive" });
    },
  });

  // Helper functions
  const resetPostForm = () => {
    setPostForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      categoryId: "",
      tags: [],
      isPublished: false,
    });
    setEditingPost(null);
    setShowPostForm(false);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      slug: "",
      description: "",
    });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      categoryId: post.categoryId || "",
      tags: post.tags || [],
      isPublished: post.isPublished || false,
    });
    setShowPostForm(true);
  };

  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setShowCategoryForm(true);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...postForm } as InsertBlogPost;
    
    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, data });
    } else {
      createPostMutation.mutate(data);
    }
  };

  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...categoryForm } as InsertBlogCategory;
    
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, data });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !postForm.tags?.includes(tagInput.trim())) {
      setPostForm({
        ...postForm,
        tags: [...(postForm.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPostForm({
      ...postForm,
      tags: postForm.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blog Administration</h1>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Blog Posts</h2>
            <Button onClick={() => setShowPostForm(true)} data-testid="button-new-post">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>

          {showPostForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        placeholder="Post title"
                        required
                        data-testid="input-post-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={postForm.slug}
                        onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                        placeholder="post-slug"
                        required
                        data-testid="input-post-slug"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={postForm.excerpt || ""}
                      onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                      placeholder="Brief description of the post"
                      data-testid="textarea-post-excerpt"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      placeholder="Post content"
                      rows={10}
                      required
                      data-testid="textarea-post-content"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={postForm.categoryId || ""}
                        onValueChange={(value) => setPostForm({ ...postForm, categoryId: value })}
                      >
                        <SelectTrigger data-testid="select-post-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={postForm.isPublished || false}
                        onCheckedChange={(checked) => setPostForm({ ...postForm, isPublished: checked })}
                        data-testid="switch-post-published"
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        data-testid="input-tag"
                      />
                      <Button type="button" onClick={addTag} size="sm" data-testid="button-add-tag">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {postForm.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      type="submit" 
                      disabled={createPostMutation.isPending || updatePostMutation.isPending}
                      data-testid="button-save-post"
                    >
                      {editingPost ? "Update" : "Create"} Post
                    </Button>
                    <Button type="button" variant="outline" onClick={resetPostForm} data-testid="button-cancel-post">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {postsLoading ? (
              <div>Loading posts...</div>
            ) : (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{post.slug}</span>
                          {post.isPublished ? (
                            <Badge variant="default">Published</Badge>
                          ) : (
                            <Badge variant="secondary">Draft</Badge>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex space-x-1">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => publishMutation.mutate({ id: post.id, publish: !post.isPublished })}
                          data-testid={`button-toggle-publish-${post.id}`}
                        >
                          {post.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPost(post)}
                          data-testid={`button-edit-post-${post.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePostMutation.mutate(post.id)}
                          data-testid={`button-delete-post-${post.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <Button onClick={() => setShowCategoryForm(true)} data-testid="button-new-category">
              <Plus className="w-4 h-4 mr-2" />
              New Category
            </Button>
          </div>

          {showCategoryForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingCategory ? "Edit Category" : "Create New Category"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitCategory} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category-name">Name</Label>
                      <Input
                        id="category-name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        placeholder="Category name"
                        required
                        data-testid="input-category-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-slug">Slug</Label>
                      <Input
                        id="category-slug"
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                        placeholder="category-slug"
                        required
                        data-testid="input-category-slug"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea
                      id="category-description"
                      value={categoryForm.description || ""}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      placeholder="Category description"
                      data-testid="textarea-category-description"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      type="submit" 
                      disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                      data-testid="button-save-category"
                    >
                      {editingCategory ? "Update" : "Create"} Category
                    </Button>
                    <Button type="button" variant="outline" onClick={resetCategoryForm} data-testid="button-cancel-category">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {categoriesLoading ? (
              <div>Loading categories...</div>
            ) : (
              categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                        <span className="text-xs text-muted-foreground">{category.slug}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCategory(category)}
                          data-testid={`button-edit-category-${category.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCategoryMutation.mutate(category.id)}
                          data-testid={`button-delete-category-${category.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BlogAdmin;