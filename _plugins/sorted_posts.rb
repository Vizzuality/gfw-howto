module Jekyll
  class SortedPosts < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      sorted_posts = []

      # First remove all posts that belong to the 'faqs' category
      site.posts.docs.each do |post|
        sorted_posts << post unless post['categories'].include? 'faqs'
      end
     
      # Then sort them according to title
      sorted_posts = sorted_posts.sort{ |a,b| a.data["title"] <=> b.data["title"] } 

      # Then sort them by tag
      grouped_posts = sorted_posts.group_by { |post| post.data["tags"] }.values.flatten

      site.config["sorted_posts"] = grouped_posts
    end
  end
end