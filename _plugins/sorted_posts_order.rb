module Jekyll
  class SortedPostsOrder < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      sorted_posts = []

      site.posts.docs.each do |post|
        # First remove all posts that belong to the faqs category and have an order
        sorted_posts << post if !post['categories'].include? 'faqs' and post['order']
      end

      # # Then sort them according to order
      sorted_posts = sorted_posts.sort{ |a,b| a.data["order"] <=> b.data["order"] } 

      site.config["sorted_posts_order"] = sorted_posts
    end
  end
end