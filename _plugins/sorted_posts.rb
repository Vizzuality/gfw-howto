module Jekyll
  class SortedPosts < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      sorted_posts = []

      site.posts.docs.each do |post|
        # First remove all posts that belong to the 'faqs' category
        sorted_posts << post unless post['categories'].include? 'faqs'
      end

      # # Then sort em according to ...
      sorted_posts = sorted_posts.sort{ |a,b| a.data["title"] <=> b.data["title"] } 

      site.config["sorted_posts"] = sorted_posts
    end
  end
end