require 'rails_helper'

RSpec.describe "shifts/new", type: :view do
  before(:each) do
    assign(:shift, Shift.new())
  end

  it "renders new shift form" do
    render

    assert_select "form[action=?][method=?]", shifts_path, "post" do
    end
  end
end
