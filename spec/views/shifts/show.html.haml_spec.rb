require 'rails_helper'

RSpec.describe "shifts/show", type: :view do
  before(:each) do
    @shift = assign(:shift, Shift.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
