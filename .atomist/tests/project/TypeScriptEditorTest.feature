Feature: Make sure the sample TypeScript Editor has some tests
  This is the sample Gherkin feature file for the BDD tests of
  the sample TypeScript editor used by AddTypeScriptEditor.
  Feel free to modify and extend to suit the needs of your editor.


  Scenario: TypeScriptEditor should edit a project correctly
    Given a project with a certain file
    When the TypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then that certain file looks different
