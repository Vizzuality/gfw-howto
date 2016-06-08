module Jekyll
  class FaqsSortedPosts < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      sorted_posts = []

      site.posts.docs.each do |post|
        # First include only posts of 'faq' category
        sorted_posts << post if post['categories'].include? 'faqs' and post['order']
      end

      # # Then sort them according to order
      sorted_posts = sorted_posts.sort{ |a,b| a.data["order"] <=> b.data["order"] } 

      site.config["faqs_sorted_posts_order"] = sorted_posts
    end
  end
end