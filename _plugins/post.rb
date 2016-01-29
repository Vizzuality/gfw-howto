module Jekyll

  class Document

    #Updated for Jekyll 3.0.0

    # override post method in order to return categories names as slug
    # instead of strings
    #
    # An url for a post with category "category with space" will be in
    # slugified form : /category-with-space
    # instead of url encoded form : /category%20with%20space
    #
    # @see utils.slugify

    def url_placeholders
      {
        collection:  collection.label,
        path:        cleaned_relative_path,
        output_ext:  output_ext,
        name:        Utils.slugify(basename_without_ext),
        title:       Utils.slugify(data['slug']) || Utils.slugify(basename_without_ext),
        year:        date.strftime("%Y"),
        month:       date.strftime("%m"),
        day:         date.strftime("%d"),
        hour:        date.strftime("%H"),
        minute:      date.strftime("%M"),
        second:      date.strftime("%S"),
        i_day:       date.strftime("%-d"),
        i_month:     date.strftime("%-m"),
        categories:  (data['categories'] || []).map { |c| Utils.slugify(c) }.uniq.join('/'),
        short_month: date.strftime("%b"),
        short_year:  date.strftime("%y"),
        y_day:       date.strftime("%j"),
      }

    end

  end

end
