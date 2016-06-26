module Jekyll
  class FaqsSortedPosts < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      sorted_posts = []

      # First include only posts of 'faq' category
      site.posts.docs.each do |post|
        sorted_posts << post if post['categories'].include? 'faqs'
      end
     
      # Then sort them according to title
      sorted_posts = sorted_posts.sort{ |a,b| a.data["title"] <=> b.data["title"] } 

      # Then sort them by tag
      grouped_posts = sorted_posts.group_by { |post| post.data["tags"] }.values.flatten

      site.config["faqs_sorted_posts"] = grouped_posts
    end
  end
end