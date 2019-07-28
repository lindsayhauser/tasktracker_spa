```ruby
i = 2
l = 1.1
s = "String"
t = true
f = false
n = nil
sym = :symbol_name
arr = [1, 2]
hash = {1 => 2}


def method_name(param1, param2: 12, param3)

# This is a comment. This method will return the sum 
# of the first and second parameters
param1 + param2
end



```
Ruby methods start with `def` and end with `end`.
To make a method private, place the method under `private`.

This method will now only be able to be used within this class.

```ruby
private
def method_name
...
end
```

```ruby
class Book

 def initialize(title, author, year)
  @title = title # the @title is now a class variable
  @author = author
  @year = year
 end
 
 def to_s
  title.to_s
 end
 
 def self.price
  10.99
 end
end
```

These are class methods. We call these like:

```ruby
Book.new("title", "author", 2000).to_s
```

This is a class method (similar to static method in Java)
We call these like: `Book.price`

Constructor







