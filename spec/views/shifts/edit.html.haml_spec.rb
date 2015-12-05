require 'rails_helper'

RSpec.describe "shifts/edit", type: :view do
  before(:each) do
    @shift = assign(:shift, Shift.create!())
  end

  it "renders the edit shift form" do
    render

    assert_select "form[action=?][method=?]", shift_path(@shift), "post" do
    end
  end
end
